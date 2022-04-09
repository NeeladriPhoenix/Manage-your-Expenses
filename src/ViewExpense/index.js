import React, { useState, useEffect } from "react";

import { TextInput } from "../ui/Input";
import { PrimaryButton } from "../ui/Button";
import Table from "../ui/Table";
import StatusPill from "../ui/StatusPill";
import Amount from "../ui/Amount";
import NoData from "../NoData";

import db from "../firebase";
import firebase from "firebase";

import { useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
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
  });
  const [expenses, setExpenses] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const getFirestore = async () => {
    const events = await firebase
      .firestore()
      .collection("expenses")
      .doc(selectedPeriod)
      .collection(selectedPeriod);
    events.get().then((querySnapshot) => {
      const tempDoc = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setExpenses(tempDoc);
    });
  };

  const searchPeriod = () => {
    if (selectedPeriod !== "") {
      getFirestore();
    }
  };

  const calculateExpense = () => {
    let added = 0;
    let deducted = 0;

    expenses.forEach((expense) => {
      if (expense.amountType === "add") {
        added += parseInt(expense.amount);
      } else if (expense.amountType === "remove") {
        deducted += parseInt(expense.amount);
      }
    });

    setExpenseReport({
      credited: added,
      debited: deducted,
    });
  };

  const fields = [
    ["Date", (item) => item?.date],
    ["Amount (INR)", (item) => <Amount amount={item?.amount} />],
    [
      "Status",
      (item) => (
        <StatusPill
          status={expenseMap[item?.amountType]?.label}
          className={expenseMap[item?.amountType]?.className}
        />
      ),
    ],
    ["Description", (item) => item?.desc],
  ];

  return (
    <div className="content__container">
      <div className="filters__container">
        <TextInput
          label="Enter Period"
          name="period-filter"
          placeholder="mm-yyyy"
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
              <div className="debited-label">Deducted | Debited</div>
              <div className="debited-amount">₹ {expenseReport.debited}</div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ViewExpense;
