import React from "react";

const CategoriesItem = ({ value }) => {
  return (
    <li className="list-group-item">
      <input
        className="form-check-input me-1"
        type="checkbox"
        value={value}
        id={value + "-checkbox"}
      />
      <label className="form-check-label" for={value + "-checkbox"}>
        {value}
      </label>
    </li>
  );
};

export default CategoriesItem;
