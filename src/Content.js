import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useStateValue } from "./StateProvider";
import AddExpenses from "./AddExpenses";
import ViewExpense from "./ViewExpense";

const Content = () => {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="content">
      <Routes>
        <Route path="/view-expenses" element={<ViewExpense />} />
        <Route path="/add-expenses" element={<AddExpenses />} />
        <Route path="*" element={<Navigate to="/view-expenses" replace />} />
      </Routes>
    </div>
  );
};

export default Content;
