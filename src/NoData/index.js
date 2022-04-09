import React from "react";

import "./NoData.css";

import NoDataSvg from "../static/no-data.svg";

const NoData = () => {
  return (
    <div className="no-data grid">
      <img src={NoDataSvg} alt="" />
      <div className="nodata-label">Select a Period</div>
      <div className="nodata-info">
        No data to show. Data will be shown once you search for any specific
        time period (mm/yyyy).
      </div>
    </div>
  );
};

export default NoData;
