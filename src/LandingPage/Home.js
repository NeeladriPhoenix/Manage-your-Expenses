import React from "react";
import "./Home.css";

import { auth, provider } from "../firebase";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";

const Home = () => {
  const [state, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="home">
      <div className="home-left">
        <div className="title">
          <h1>Record your expenses to save more.</h1>
        </div>
        <div className="description">
          <h3>Now you can track all your expenses with a single click.</h3>
        </div>
        <div className="btn">
          <button type="button" onClick={signIn}>
            Login
          </button>
        </div>
      </div>
      <div className="home-right">
        <img
          src="https://preview.colorlib.com/theme/cryptian/assets/img/xwelcome-img.png.pagespeed.ic.zSc4mD6TKE.webp"
          alt=""
        />
      </div>
    </div>
  );
};

export default Home;
