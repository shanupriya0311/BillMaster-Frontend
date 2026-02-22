import React, { useState, useEffect } from "react";
import "./AddProductModal.css";
import { toast } from "react-toastify";

function AddProductModal({ onClose, onAdd, initialData }) {
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

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        sku: initialData.sku || "",
        barcode: initialData.barcode || "",
        category: initialData.category || "",
        price: initialData.price || "",
        tax: initialData.tax ?? 18,
        stock: initialData.stock ?? 0,
        lowStock: initialData.lowStock ?? 10,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onAdd(form);
    onClose();
  };

  const isEditing = !!initialData;

  return (
    <div className="ap-overlay">
      <div className="ap-modal">

        <div className="ap-header">
          <h2>{isEditing ? "Edit Product" : "Add New Product"}</h2>
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
              {isEditing ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default AddProductModal;
