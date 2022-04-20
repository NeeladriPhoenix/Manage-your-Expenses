import React, { useState, useEffect } from "react";

import { TextArea, AmountField, SelectInput } from "../ui/Input";
import { PrimaryButton } from "../ui/Button";
import { amountTypes } from "../AddExpenses";
import { useStateValue } from "../StateProvider";

import db from "../firebase";

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

const UpdateDetailsForm = ({
  selectedPeriod,
  item,
  openDrawer,
  setOpenDrawer,
  getExpensesData,
}) => {
  const [updatedDesc, setUpdatedDesc] = useState("");
  const [updatedAmount, setUpdatedAmount] = useState("");
  const [updatedAmountType, setUpdatedAmountType] = useState("");
  const [updatedCouponApplied, setUpdatedCouponApplied] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (openDrawer) onOpen();
    if (!isOpen) setOpenDrawer(false);
  }, [openDrawer, isOpen]);

  useEffect(() => {
    setUpdatedDesc(item.desc);
    setUpdatedAmount(item.amount);
    setUpdatedAmountType(item.amountType);
  }, [item]);

  const updateExpense = (event) => {
    event.preventDefault();
    db.collection(user.email)
      .doc(user.email)
      .collection("expenses")
      .doc(selectedPeriod)
      .collection(selectedPeriod)
      .doc(item.id)
      .update({
        desc: updatedDesc,
        amount: updatedAmount,
        amountType: updatedAmountType,
        couponApplied: updatedCouponApplied,
      });

    toast({
      title: "Updated Successfully.",
      status: "success",
      position: "top-right",
      duration: 4000,
      isClosable: true,
    });

    onClose();

    getExpensesData();
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader className="drawer-header">
          Update Data : {item?.id}
        </DrawerHeader>

        <DrawerBody>
          <form>
            <TextArea
              label="Expense Description"
              name="desc"
              placeholder="Reason of Expense"
              largeWidth={true}
              value={updatedDesc}
              onChange={(event) => {
                setUpdatedDesc(event.target.value);
              }}
            />
            <AmountField
              label="Amount"
              name="amount"
              type="number"
              placeholder="Enter Amount in INR"
              largeWidth={true}
              value={updatedAmount}
              onChange={(event) => {
                setUpdatedAmount(event.target.value);
              }}
            />
            <SelectInput
              name="type"
              label="Select Amount Type"
              options={amountTypes}
              largeWidth={true}
              value={updatedAmountType}
              onChange={(event) => {
                setUpdatedAmountType(event.target.value);
              }}
            />
            <SelectInput
              name="coupons"
              label="Coupon Applied"
              options={[
                { label: "Yes", value: 1 },
                { label: "No", value: 0 },
              ]}
              largeWidth={true}
              value={updatedCouponApplied}
              onChange={(event) => {
                setUpdatedCouponApplied(event.target.value);
              }}
            />
            <PrimaryButton
              label="Update"
              fullWidth={true}
              variant="primary"
              onClick={updateExpense}
            />
          </form>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default UpdateDetailsForm;
