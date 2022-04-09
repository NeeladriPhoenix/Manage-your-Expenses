import React from "react";
import { Routes, Route } from "react-router-dom";

import AddExpenses from "./AddExpenses";
import ViewExpense from "./ViewExpense";

const Content = () => {
  return (
    <div className="content">
      <Routes>
        <Route path="/" element={<ViewExpense />} />
        <Route path="/add-expenses" element={<AddExpenses />} />
      </Routes>
    </div>
  );
};

export default Content;
