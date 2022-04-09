import React from "react";

import "./StatusPill.css";

const StatusPill = ({ status, className }) => {
  return <div className={`pill ${className}`}>{status}</div>;
};

export default StatusPill;
