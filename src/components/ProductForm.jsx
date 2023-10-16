import React, { useState } from "react";

const ProductForm = ({ onAddProduct, onFormClick }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "", // Use File type for image
    price: 1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === "popup") {
      onFormClick();
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    onAddProduct(formData);
    setFormData({
      title: "",
      description: "",
      image: "",
      price: 0,
    });
    onFormClick();
  };

  return (
    <div className="popup" onClick={handleOverlayClick}>
      <div className="popup-content">
        <h2>Add Product</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="image"
          onChange={handleInputChange}
          placeholder="Image"
        />
        {/* {imageURL && (
          <img width={100} height={50} src={imageURL} alt="Selected" />
        )}{" "} */}
        {/* Display the image */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
        />
        <button onClick={handleSave} className="save-button">
          Save
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
