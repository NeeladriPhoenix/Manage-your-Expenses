import React from "react";

import "./App.css";

import Sidebar from "./Sidebar";
import Content from "./Content";
import { withRouter } from "./hoc/withRouter";

const App = (props) => {
  return (
    <div className="main-container">
      <Sidebar />
      <Content {...props} />
    </div>
  );
};

export default withRouter(App);
