import React from "react";

const Header = ({ onSortClick, sortByPrice, onFormClick }) => {
  return (
    <div className="ui fixed menu">
      <div className="ui container center">
        <h2>FakeShop</h2>
        <div className="right menu">
          <button
            className="sort-button sorting"
            style={{ backgroundColor: "blue", color: "white" }}
            onClick={onSortClick}
          >
            Sort by Price
          </button>
          <button
            className="sort-button sorting"
            style={{ backgroundColor: "blue", color: "white" }}
            onClick={onFormClick}
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
