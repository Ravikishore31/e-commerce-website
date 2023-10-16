import React from "react";
import { Link } from "react-router-dom";

const AddProduct = ({ products1, sortByPrice, deleteProduct }) => {
  //console.log(products1);
  const renderList = products1
    .slice()
    .sort((a, b) => {
      if (sortByPrice === "highToLow") {
        return b.price - a.price;
      } else if (sortByPrice === "lowToHigh") {
        return a.price - b.price;
      }
      return 0;
    })
    .map((product) => {
      const { id, title, image, price, category = "offer" } = product;
      return (
        <div className="four wide column" key={id} onClick={deleteProduct}>
          <Link to={`/product/${id}`}>
            <div className="ui link cards">
              <div className="card">
                <div className="image">
                  <img src={image} alt={title} />
                </div>
                <div className="content">
                  <div className="header">{title}</div>
                  <div className="meta price">$ {price}</div>
                  <div className="meta">{category}</div>
                </div>
              </div>
            </div>
          </Link>
          <div className="ui buttons">
            <button onClick={() => deleteProduct(id)} className="ui button red">
              Delete
            </button>
          </div>
        </div>
      );
    });

  return <>{products1.length > 0 && renderList}</>;
};

export default AddProduct;
