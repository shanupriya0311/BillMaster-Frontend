import React, { useState } from "react";
import axios from "axios";
import "./AddProductModal.css";

function AddProductModal({ onClose, onAdd }) {

  const [form, setForm] = useState({
    name: "",
    sku: "",
    barcode: "",
    category: "",
    price: "",
    tax: 18,
    stock: 0,
    lowStock: 10,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const adddata = async (form) => {
    try {
      await axios.post("http://localhost:8085/api/products", {
        ...form,
        price: Number(form.price),
        tax: Number(form.tax),
        stock: Number(form.stock),
        lowStock: Number(form.lowStock),
      });

      console.log("product added successfully");
    } catch (error) {
      console.log("product is not added successfully", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onAdd(form);
    await adddata(form);
    onClose();
  };

  return (
    <div className="ap-overlay">
      <div className="ap-modal">

        <div className="ap-header">
          <h2>Add New Product</h2>
          <button className="ap-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
        
          <div className="ap-row">
            <div className="ap-group">
              <label>Product Name</label>
              <input
                name="name"
                placeholder="Enter product name"
                className="ap-highlight"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="ap-group">
              <label>SKU</label>
              <input
                name="sku"
                placeholder="e.g., BEV001"
                value={form.sku}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="ap-row">
            <div className="ap-group">
              <label>Barcode</label>
              <input
                name="barcode"
                placeholder="Scan or enter barcode"
                value={form.barcode}
                onChange={handleChange}
              />
            </div>

            <div className="ap-group">
              <label>Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">Select category</option>
                <option>Beverages</option>
                <option>Snacks</option>
                <option>Dairy</option>
                <option>Grocery</option>
              </select>
            </div>
          </div>
          <div className="ap-row">
            <div className="ap-group">
              <label>Price (₹)</label>
              <input
                name="price"
                type="number"
                placeholder="0.00"
                value={form.price}
                onChange={handleChange}
              />
            </div>

            <div className="ap-group">
              <label>Tax Rate (%)</label>
              <input
                name="tax"
                type="number"
                value={form.tax}
                onChange={handleChange}
              />
            </div>

            <div className="ap-group">
              <label>Stock</label>
              <input
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleChange}
              />
            </div>
          </div>

        
          <div className="ap-group ap-full">
            <label>Low Stock Threshold</label>
            <input
              name="lowStock"
              type="number"
              value={form.lowStock}
              onChange={handleChange}
            />
          </div>
          <div className="ap-footer">
            <button type="button" className="ap-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="ap-submit">
              Add Product
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default AddProductModal;
