import React, { useState } from "react";

import "./Table.css";

const Value = (props) => {
  return <td>{props.valueFn(props.item, props.index)}</td>;
};

const Table = ({ items, fields }) => {
  return (
    <table>
      <thead>
        <tr className="table-heading-row">
          {fields.map((field, index) => (
            <th key={index}>{field[0]}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, idx) => (
          <tr key={idx}>
            {fields.map((field, index) => (
              <Value key={index} index={index} item={item} valueFn={field[1]} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
