import React, { useState, useEffect } from "react";

import { TextInput, SelectInput } from "../ui/Input";
import { PrimaryButton } from "../ui/Button";
import Table from "../ui/Table";
import StatusPill from "../ui/StatusPill";
import Amount from "../ui/Amount";
import NoData from "../NoData";
import UpdateDetailsForm from "./UpdateDetailsForm";

import db from "../firebase";
import firebase from "firebase";
import { useStateValue } from "../StateProvider";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";

export const expenseMap = {
  add: {
    label: "Added (Credited)",
    className: "success",
  },
  remove: {
    label: "Deducted (Debited)",
    className: "error",
  },
};

const ViewExpense = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [expenseReport, setExpenseReport] = useState({
    credited: "",
    debited: "",
    savedViaCoupons: "",
  });
  const [expenses, setExpenses] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [toUpdate, setToUpdate] = useState({});
  const [periodsList, setPeriodsList] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [{ user }, dispatch] = useStateValue();

  const fetchPeriods = async () => {
    const events = await firebase
      .firestore()
      .collection(user.email)
      .doc(user.email)
      .collection("periods")
      .orderBy("timeStamp", "desc");

    events.get().then((querySnapshot) => {
      const tempDoc = querySnapshot.docs.map((doc) => {
        const resp = {
          value: doc.data().periodValue,
          label: doc.data().periodValue,
        };
        return resp;
      });
      setPeriodsList(tempDoc);
    });
  };

  useEffect(() => {
    fetchPeriods();
  }, []);

  const getExpensesData = async () => {
    const events = await firebase
      .firestore()
      .collection(user.email)
      .doc(user.email)
      .collection("expenses")
      .doc(selectedPeriod)
      .collection(selectedPeriod)
      .orderBy("timeStamp", "desc");
    events.get().then((querySnapshot) => {
      const tempDoc = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setExpenses(tempDoc);
    });
  };

  const searchPeriod = () => {
    if (selectedPeriod !== "") {
      getExpensesData();
    }
  };

  const calculateExpense = () => {
    let added = 0;
    let deducted = 0;
    let savedViaCoupons = 0;

    expenses.forEach((expense) => {
      if (expense.couponApplied === "1") {
        savedViaCoupons += parseInt(expense.amount);
      } else {
        if (expense.amountType === "add") {
          added += parseInt(expense.amount);
        } else if (expense.amountType === "remove") {
          deducted += parseInt(expense.amount);
        }
      }
    });

    setExpenseReport({
      credited: added,
      debited: deducted,
      savedViaCoupons: savedViaCoupons,
    });
  };

  const deleteRow = (id) => {
    db.collection(user.email)
      .doc(user.email)
      .collection("expenses")
      .doc(selectedPeriod)
      .collection(selectedPeriod)
      .doc(id)
      .delete();

    toast({
      title: "Deleted Successfully.",
      status: "success",
      position: "top-right",
      duration: 4000,
      isClosable: true,
    });

    getExpensesData();
  };

  const fields = [
    ["Date", (item) => item?.date],
    ["Amount (INR)", (item) => <Amount amount={item?.amount} />],
    [
      "Status",
      (item) =>
        item.couponApplied === "1" ? (
          <StatusPill status="Applied Coupon" className="primary" />
        ) : (
          <StatusPill
            status={expenseMap[item?.amountType]?.label}
            className={expenseMap[item?.amountType]?.className}
          />
        ),
    ],
    ["Description", (item) => item?.desc],
    [
      "Actions",
      (item) => (
        <div className="row">
          <PrimaryButton
            label="Delete"
            variant="primary"
            onClick={() => {
              deleteRow(item.id);
            }}
          />
          <PrimaryButton
            label="Update"
            variant="outlined"
            onClick={() => {
              setToUpdate(item);
              setOpenDrawer(!openDrawer);
            }}
          />
        </div>
      ),
    ],
  ];

  return (
    <div className="content__container">
      <div className="filters__container">
        <SelectInput
          name="type"
          label="Enter Period"
          placeholder="mm-yyyy"
          options={periodsList}
          value={selectedPeriod}
          onChange={(event) => {
            setSelectedPeriod(event.target.value);
          }}
        />
        <div className="actionBtn">
          <PrimaryButton
            label="Search"
            variant="primary"
            onClick={searchPeriod}
          />
          <PrimaryButton
            label="Calculate Expense"
            variant="outlined"
            onClick={() => {
              calculateExpense();
              onOpen();
            }}
          />
        </div>
      </div>
      {expenses.length > 0 ? (
        <Table items={expenses} fields={fields} />
      ) : (
        <NoData />
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your Expense Report</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="success expense-container">
              <div className="credited-label">Added | Credited</div>
              <div className="credited-amount">₹ {expenseReport.credited}</div>
            </div>
            <div className="error expense-container">
              <div className="debited-label">Expenditure | Debited</div>
              <div className="debited-amount">₹ {expenseReport.debited}</div>
            </div>
            <div className="primary expense-container">
              <div className="debited-label">Saved via Coupons</div>
              <div className="debited-amount">
                ₹ {expenseReport.savedViaCoupons}
              </div>
            </div>
            <hr />
            <div className="info expense-container">
              <div className="debited-label">Remaining Amount</div>
              <div className="debited-amount">
                ₹ {expenseReport.credited - expenseReport.debited}
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      {Object.keys(toUpdate).length > 0 && (
        <UpdateDetailsForm
          selectedPeriod={selectedPeriod}
          item={toUpdate}
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          getExpensesData={getExpensesData}
        />
      )}
    </div>
  );
};

export default ViewExpense;
