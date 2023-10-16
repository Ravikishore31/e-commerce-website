import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import ProductForm from "./ProductForm";
import { v4 as uuidv4 } from "uuid";
import { addProduct1 } from "../redux/actions/productsActions";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductComponent = () => {
  const products = useSelector((state) => state.allProducts.products);
  const [sortByPrice, setSortByPrice] = useState("lowToHigh"); // Default sorting
  const [isFormVisible, setFormVisible] = useState(false);
  const [products1, setProducts1] = useState([...products]);
  const dispatch = useDispatch();
  console.log(products1);

  useEffect(() => {
    // Load products1 from localStorage when the component mounts
    const products1Data = localStorage.getItem("products1");
    if (products1Data) {
      setProducts1(JSON.parse(products1Data));
    }
  }, []); // The empty dependency array ensures this runs only once when the component mounts

  //console.log(products1);
  const addProduct = (newProduct) => {
    // Generate a unique id for the new product using uuid
    newProduct.id = uuidv4();
    // Merge the new product with the existing products1 and products
    const updatedProducts1 = [...products, newProduct];

    // Update the local state
    setProducts1(updatedProducts1);

    // Update the data in local storage
    localStorage.setItem("products1", JSON.stringify(updatedProducts1));
    dispatch(addProduct1(newProduct));
  };

  const deleteProduct = (productId) => {
    // Filter out the product with the matching ID from products1
    const updatedProducts1 = products1.filter(
      (product) => product.id !== productId
    );

    // Update the local state for products1
    setProducts1(updatedProducts1);

    // Update the data in local storage for products1
    localStorage.setItem("products1", JSON.stringify(updatedProducts1));
  };

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
      const { id, title, image, price } = product;

      return (
        <div className="four wide column" key={id}>
          <Link to={`/product/${id}`}>
            <div className="ui link cards">
              <div className="card">
                <div className="image">
                  <img src={image} alt={title} />
                </div>
                <div className="content">
                  <div className="header">{title}</div>
                  <div className="meta price">$ {price}</div>
                </div>
              </div>
            </div>
          </Link>
          <>
            <button onClick={() => deleteProduct(id)} className="delete-button">
              <DeleteIcon />
            </button>
          </>
        </div>
      );
    });

  const handleSortClick = () => {
    setSortByPrice((prevSort) =>
      prevSort === "lowToHigh" ? "highToLow" : "lowToHigh"
    );
  };

  const onFormClick = () => {
    setFormVisible(!isFormVisible);
  };

  return (
    <>
      <Header
        onSortClick={handleSortClick}
        sortByPrice={sortByPrice}
        onFormClick={onFormClick}
      />
      {isFormVisible && (
        <ProductForm onAddProduct={addProduct} onFormClick={onFormClick} />
      )}
      {renderList}
    </>
  );
};

export default ProductComponent;
