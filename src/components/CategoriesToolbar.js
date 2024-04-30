import React from "react";
import CategoriesList from "./CategoriesList";
import { useState, useEffect } from "react";

const CategoriesToolbar = ({ categories }) => {
  const [expanded, setExpanded] = useState(false);

  function toggleCategories() {
    setExpanded(!expanded);
  }

  //   useEffect(() => {
  //     // Update the document title using the browser API
  //     console.log(categories);
  //   });

  return (
    <div className="categories-container">
      <div className="categories-container-btn">
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-secondary dropdown-toggle"
            aria-expanded={expanded}
            onClick={toggleCategories}
          >
            Categories
          </button>
        </div>
      </div>
      {expanded && <CategoriesList categoryList={categories} />}
    </div>
  );
};

export default CategoriesToolbar;
