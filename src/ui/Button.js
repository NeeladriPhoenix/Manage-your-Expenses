import React from "react";

export const PrimaryButton = ({ label, onClick, fullWidth, variant }) => {
  let variantClass;

  if (variant === "primary") {
    variantClass = "btn-primary";
  } else if (variant === "outlined") {
    variantClass = "btn-outlined";
  } else if (variant === "text") {
    variantClass = "btn-text";
  }

  return (
    <button
      className={`btn ${variantClass} ${fullWidth ? "fullWidth" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
