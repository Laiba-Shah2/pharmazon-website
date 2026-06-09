import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/manageInventory.css"; 
import API_BASE from "../../config.js";

const BASE_URL = `${API_BASE}/backend/public`;

export default function InventoryManager() {
  const [medicines, setMedicines] = useState([]);
  const [inventory, setInventory] = useState([]);

  const [formData, setFormData] = useState({
    id: "",
    medicine_name: "",
    stock_quantity: "",
    sold_quantity: "",
    batch_no: "",
    expiry_date: "",
    purchase_date: "",
    status: "In Stock",
  });

  const [isEditing, setIsEditing] = useState(false);

  const API_URL = `${BASE_URL}/index.php?action=api`;
  const ENDPOINTS = {
    fetch: `${API_URL}/getInventory`,
    add: `${API_URL}/addInventory`,
    update: `${API_URL}/updateInventory`,
    delete: `${API_URL}/deleteInventory`,
    medicines: `${API_URL}/getMedicines`,
  };

  // ---------------------------
  // FETCH ALL MEDICINES
  // ---------------------------
  const fetchMedicines = async () => {
    try {
      const res = await axios.get(ENDPOINTS.medicines);
      if (res.data.status === "success") {
        setMedicines(res.data.data);
        console.log("Fetched Medicines:", res.data.data);
      }
    } catch (error) {
      console.log("Error loading medicines", error);
    }
  };

  // ---------------------------
  // FETCH INVENTORY
  // ---------------------------
  const fetchInventory = async () => {
    try {
      const res = await axios.get(ENDPOINTS.fetch);
      
      // FIX 1: Standardized status check to "success"
      if (res.data.status === "success") { 
        console.log("Fetched Inventory Data:", res.data.data);
        setInventory(res.data.data);
      } else if (res.data.status === false && res.data.message === 'No stock found.') {
        setInventory([]);
      }
    } catch (error) {
      // This catch runs if the JSON is malformed (due to extraneous output)
      console.error("Error loading inventory (Check PHP file for extra characters):", error);
    }
  };

  useEffect(() => {
    fetchMedicines();
    fetchInventory();
  }, []);

  // ---------------------------
  // FORM HANDLERS
  // ---------------------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      id: "",
      medicine_name: "",
      stock_quantity: "",
      sold_quantity: "",
      batch_no: "",
      expiry_date: "",
      purchase_date: "",
      status: "In Stock",
    });
    setIsEditing(false);
  };

  // ---------------------------
  // ADD INVENTORY
  // ---------------------------
  const handleAdd = async () => {
    try {
      const res = await axios.post(ENDPOINTS.add, formData);

      if (res.data.status === "success") {
        alert("Inventory added successfully!");
        fetchInventory(); // Refresh table
        resetForm();
      } else {
        // Show message from API if it was a valid JSON failure
        alert(res.data.message || "Failed to add inventory due to an unknown error.");
        console.log("API Failure Response:", res.data);
      }
    } catch (err) {
      // This usually means connection error or malformed JSON from PHP
      console.error("Add Inventory Request Error (Check PHP output):", err);
      alert(`Failed to add inventory. Check console for details. (Error: ${err.message})`);
    }
  };

  // ---------------------------
  // UPDATE INVENTORY
  // ---------------------------
  const handleUpdate = async () => {
    try {
      const res = await axios.post(ENDPOINTS.update, formData);

      // FIX 2: Standardized status check to "success"
      if (res.data.status === "success") { 
        alert("Inventory updated!");
        fetchInventory();
        resetForm();
      } else {
        alert(res.data.message || "Failed to update inventory.");
        console.log("API Failure Response:", res.data);
      }
    } catch (err) {
      console.error("Update Inventory Request Error (Check PHP output):", err);
      alert(`Update error: ${err.message}. Check console.`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isEditing ? handleUpdate() : handleAdd();
  };

  // ---------------------------
  // EDIT INVENTORY
  // ---------------------------
  const handleEdit = (item) => {
    setFormData({ ...item });
    setIsEditing(true);
  };

  // ---------------------------
  // DELETE INVENTORY
  // ---------------------------
  const handleDelete = async (medicine_name) => {
    // Replaced window.confirm
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const res = await axios.post(ENDPOINTS.delete, { medicine_name });

      if (res.data.status === "success") {
        alert("Deleted successfully!");
        fetchInventory();
      } else {
        alert(res.data.message || "Failed to delete inventory.");
      }
    } catch (err) {
      console.error("Delete Inventory Request Error (Check PHP output):", err);
      alert(`Delete error: ${err.message}. Check console.`);
    }
  };

  // ---------------------------
  // GET MEDICINE NAME (Unused but kept for reference)
  // ---------------------------
  const getMedicineName = (id) => {
    const m = medicines.find((med) => String(med.id) === String(id));
    return m ? m.name : "Unknown";
  };

  return (
    <div className="inventory-container">
      <h2>Inventory Management</h2>

      {/* FORM */}
      <form className="inventory-form" onSubmit={handleSubmit}>
        <div className="form-grid">

          {/* Medicine Dropdown */}
          <select
            name="medicine_name"
            value={formData.medicine_name}
            onChange={handleChange}
            required
          >
            <option value="">Select Medicine</option>
            {medicines.map((m) => (
              <option key={m.id} value={m.name}>
                {m.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="stock_quantity"
            placeholder="Stock Quantity"
            value={formData.stock_quantity}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="sold_quantity"
            placeholder="Sold Quantity"
            value={formData.sold_quantity}
            onChange={handleChange}
          />

          <input
            type="text"
            name="batch_no"
            placeholder="Batch No"
            value={formData.batch_no}
            onChange={handleChange}
            required
          />

          <div className="date-input-wrapper">
            <label>Expiry Date</label>
            <input
              type="date"
              name="expiry_date"
              value={formData.expiry_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="date-input-wrapper">
            <label>Purchase Date</label>
            <input
              type="date"
              name="purchase_date"
              value={formData.purchase_date}
              onChange={handleChange}
              required
            />
          </div>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="Expired">Expired</option>
          </select>
        </div>

        <button className="submit-btn" type="submit">
          {isEditing ? "Update Inventory" : "Add Inventory"}
        </button>

        {isEditing && (
          <button className="cancel-btn" type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      <h3>Inventory List</h3>

    <div className="table-wrapper">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Batch No</th>
              <th>Stock</th>
              <th>Sold</th>
              <th>Purchase Date</th>
              <th>Expiry Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {inventory.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No records found
                </td>
              </tr>
            ) : (
              inventory.map((item) => (
                <tr key={item.id}>
                  <td>{item.medicine_name}</td>
                  <td>{item.batch_no}</td>
                  <td>{item.stock_quantity}</td>
                  <td>{item.sold_quantity}</td>
                  <td>{item.purchase_date}</td>
                  <td>{item.expiry_date}</td>
                  <td>{item.status}</td>
                  <td>
              <button
                className="edit-btn"
                onClick={() => handleEdit(item)}
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(item.medicine_name)}
              >
                Delete
              </button>
            </td>
                </tr>
              ))

            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}