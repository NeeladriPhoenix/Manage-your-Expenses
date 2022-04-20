import React from "react";
import { Link } from "react-router-dom";

import { AddIcon, ViewIcon } from "@chakra-ui/icons";

const Sidebar = () => {
  return (
    <div className="sidebar__container">
      <Link to="/view-expenses">
        <div className="sidebar__link">
          <ViewIcon />
          <div className="sidebar__linkLabel">View Expenses</div>
        </div>
      </Link>
      <Link to="/add-expenses">
        <div className="sidebar__link">
          <AddIcon />
          <div className="sidebar__linkLabel">Add Expenses</div>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
