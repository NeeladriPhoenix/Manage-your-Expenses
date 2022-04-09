import React from "react";

export const TextInput = ({
  label,
  error,
  name,
  placeholder,
  largeWidth,
  value,
  onChange,
  type = "text",
}) => {
  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`form-field-input ${largeWidth ? "large-input" : ""}`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export const TextArea = ({
  label,
  error,
  name,
  placeholder,
  largeWidth,
  value,
  onChange,
}) => {
  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      <textarea
        name={name}
        placeholder={placeholder}
        className={`form-field-textarea ${largeWidth ? "large-input" : ""}`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export const AmountField = ({
  label,
  error,
  name,
  placeholder,
  largeWidth,
  value,
  onChange,
}) => {
  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      <div className={`form-field-input ${largeWidth ? "large-input" : ""}`}>
        <span className="form-field-input-prefix">INR</span>
        <input
          type="number"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export const SelectInput = ({
  name,
  label,
  options,
  largeWidth,
  value,
  onChange,
}) => {
  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        className={`form-field-input ${largeWidth ? "large-input" : ""}`}
        value={value}
        onChange={onChange}
      >
        {options.map((optionObj, idx) => (
          <option value={optionObj.value} key={idx}>
            {optionObj.label}
          </option>
        ))}
      </select>
    </div>
  );
};
