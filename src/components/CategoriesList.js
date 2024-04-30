import React from "react";
import CategoriesItem from "./CategoriesItem";

const CategoriesList = ({ categoryList }) => {
  const categories = categoryList.map((category) => (
    <CategoriesItem key={category} value={category}></CategoriesItem>
  ));

  return (
    <div className="categories-list-container border-radius-sm">
      <ul className="list-group">
        <li className="select-deselect-container" role="presentation">
          <button className="btn btn-light">Select All</button>
          <button className="btn btn-light">Deselect All</button>
        </li>
        {categories}
      </ul>
    </div>
  );
};

export default CategoriesList;
