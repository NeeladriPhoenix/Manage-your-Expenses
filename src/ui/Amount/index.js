import React from "react";

import "./Amount.css";

const Amount = ({ amount }) => {
  const numberWithCommas = (numStr) => {
    return numStr?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div>
      <span className="inr">₹</span>
      <span className="amount-box">{numberWithCommas(amount)}</span>
    </div>
  );
};

export default Amount;
