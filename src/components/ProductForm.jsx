import React, { useState } from "react";

const ProductForm = ({ onAddProduct, onFormClick }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    price: 1,
  });

  const [error, setError] = useState(null); // State variable for error message

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

    // Validation: Check if any of the input fields are empty
    if (
      formData.title.trim() === "" ||
      formData.description.trim() === "" ||
      formData.image.trim() === "" ||
      formData.price <= 0
    ) {
      // Determine which field is empty and set the error message
      let errorMessage = "Please fill in the following field(s): ";
      if (formData.title.trim() === "") {
        errorMessage += "Title, ";
      }
      if (formData.description.trim() === "") {
        errorMessage += "Description, ";
      }
      if (formData.image.trim() === "") {
        errorMessage += "Image, ";
      }
      if (formData.price <= 0) {
        errorMessage += "Price, ";
      }

      // Remove the trailing comma and space
      errorMessage = errorMessage.slice(0, -2);

      setError(errorMessage); // Set the error message
      return; // Prevent further execution
    }

    // If there are no errors, clear the error message
    setError(null);

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
        {error && <div className="error-message">{error}</div>}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="image"
          onChange={handleInputChange}
          placeholder="Image"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
        <button onClick={handleSave} className="save-button">
          Save
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
