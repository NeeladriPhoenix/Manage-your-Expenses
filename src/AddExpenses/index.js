import React, { useState } from "react";

import { TextInput, TextArea, AmountField, SelectInput } from "../ui/Input";
import { PrimaryButton } from "../ui/Button";

import db from "../firebase";
import firebase from "firebase";

import { useToast } from "@chakra-ui/react";

const amountTypes = [
  {
    label: "Credited (Added)",
    value: "add",
  },
  {
    label: "Debited (Deducted)",
    value: "remove",
  },
];

const AddExpenses = () => {
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [amountType, setAmountType] = useState("add");

  const toast = useToast();

  const isDate = function (date) {
    return new Date(date) !== "Invalid Date" && !isNaN(new Date(date));
  };

  const addExpense = (event) => {
    event.preventDefault();

    if (
      isDate(date) &&
      date !== "" &&
      desc !== "" &&
      amount !== "" &&
      amountType !== ""
    ) {
      const dateArraySplit = date.split("/");
      const collectionName = `${dateArraySplit[1]}-${dateArraySplit[2]}`;

      db.collection("expenses")
        .doc(collectionName)
        .collection(collectionName)
        .add({
          date: date,
          desc: desc,
          amount: amount,
          amountType: amountType,
          timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

      setDate("");
      setAmount("");
      setDesc("");
    } else {
      toast({
        title: "Invalid Data",
        description:
          "Please check your data once. Either the value isn't in correct format or any field is empty.",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="content__container grid">
      <form>
        <div className="heading">Where did you spend ?</div>
        <TextInput
          label="Date"
          name="date"
          placeholder="Enter Date"
          largeWidth={true}
          value={date}
          onChange={(event) => {
            setDate(event.target.value);
          }}
        />
        <TextArea
          label="Expense Description"
          name="desc"
          placeholder="Reason of Expense"
          largeWidth={true}
          value={desc}
          onChange={(event) => {
            setDesc(event.target.value);
          }}
        />
        <AmountField
          label="Amount"
          name="amount"
          type="number"
          placeholder="Enter Amount in INR"
          largeWidth={true}
          value={amount}
          onChange={(event) => {
            setAmount(event.target.value);
          }}
        />
        <SelectInput
          name="type"
          label="Select Amount Type"
          options={amountTypes}
          largeWidth={true}
          value={amountType}
          onChange={(event) => {
            setAmountType(event.target.value);
          }}
        />
        <PrimaryButton
          label="ADD"
          fullWidth={true}
          variant="primary"
          onClick={addExpense}
        />
      </form>
    </div>
  );
};

export default AddExpenses;