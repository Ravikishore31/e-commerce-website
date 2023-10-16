import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedProduct,
  removeSelectedProduct,
} from "../redux/actions/productsActions";

const ProductDetails = () => {
  const { productId } = useParams();
  let product = useSelector((state) => state.product);
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();

  // State to store the products1 array
  const [products1, setProducts1] = useState([]);

  const { image, title, price, description } = product;

  // Function to fetch products1 from local storage
  const fetchProducts1FromLocalStorage = () => {
    const products1Data = localStorage.getItem("products1");
    if (products1Data) {
      const parsedProducts1 = JSON.parse(products1Data);

      const matchedProduct1 = parsedProducts1.find(
        (product) => product.id === productId
      );

      if (matchedProduct1) {
        // Dispatch the matched product
        dispatch(selectedProduct(matchedProduct1));
      }

      //console.log(matchedProduct1);

      setProducts1(matchedProduct1);
    }
  };

  // Fetch product details based on the productId
  const fetchProductDetail = async (id) => {
    const response = await axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(selectedProduct(response.data));
  };

  useEffect(() => {
    if (productId && productId !== "") {
      // Fetch product details
      fetchProductDetail(productId);

      // Fetch products1 from local storage
      fetchProducts1FromLocalStorage();
    }

    // Cleanup function
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productId]);

  return (
    <div className="ui grid container">
      {Object.keys(product).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div className="ui placeholder segment">
          <div className="ui two column stackable center aligned grid">
            <div className="ui vertical divider">AND</div>
            <div className="middle aligned row">
              <div className="column lp">
                <img className="ui fluid image" src={image} />
              </div>
              <div className="column rp">
                <h1>{title}</h1>
                <h2>
                  <a className="ui teal tag label">${price}</a>
                </h2>
                <p>{description}</p>
                <div className="ui vertical animated button" tabIndex="0">
                  <div className="hidden content">
                    <i className="shop icon"></i>
                  </div>
                  <div className="visible content">Add to Cart</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
