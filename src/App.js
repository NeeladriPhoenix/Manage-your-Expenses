import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import Sidebar from "./Sidebar";
import Content from "./Content";
import { withRouter } from "./hoc/withRouter";
import { useStateValue } from "./StateProvider";
import LandingPage from "./LandingPage";

const App = (props) => {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="main-container">
      {!user ? (
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      ) : (
        <>
          <Sidebar />
          <Content {...props} />
        </>
      )}
    </div>
  );
};

export default withRouter(App);
