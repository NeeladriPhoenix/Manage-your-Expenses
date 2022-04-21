import React from "react";
import "./Description.css";
function Description() {
  return (
    <div className="description">
      <div className="description-title">
        <h1>why should we keep a track our expenses?</h1>
      </div>
      <div className="workPage-row">
        <div className="workPage-row-container">
          <img
            src="https://www.pngmart.com/files/5/Mindfulness-PNG-Transparent-Image.png"
            alt=""
            className="first-image"
          />
          <h3>You will spend mindfully</h3>
          <p>
            When you write down every expense it helps you spend more mindfully
            and prevents you from splurging.
          </p>
        </div>
        <div className="workPage-row-container">
          <img
            src="https://www.pngall.com/wp-content/uploads/7/Budget-PNG-Pic.png"
            alt=""
          />
          <h3>Making financial control</h3>
          <p>
            When you track your expenses, you take complete control over your
            finances.
          </p>
        </div>
        <div className="workPage-row-container">
          <img
            src="https://www.downloadclipart.net/large/budget-png-transparent-image.png"
            alt=""
          />
          <h3> Make a better budget?</h3>
          <p>
            By tracking your expenses it will help you make clear budgets for
            your monthly spends.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Description;
