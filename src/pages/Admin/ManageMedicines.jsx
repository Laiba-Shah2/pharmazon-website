import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/manageMedicines.css";
import API_BASE from "../../config.js";


function ManageMedicines() {
  const BASE_URL = `${API_BASE}/backend/public`;

  const [categories, setCategories] = useState([]);
  const [medicines, setMedicines] = useState([]);

  const [formData, setFormData] = useState({
    med_id: "",
    med_name: "",
    med_formula: "",
    med_price: "",
    med_manufacturer: "",
    med_description: "",
    category: "",       // FIXED: Store category name (not id)
    med_image_url: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // ---------------------------
  // FETCH CATEGORIES
  // ---------------------------
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/index.php?action=api/getCategory` );

      if (res.data.status === "success") {
        setCategories(res.data.data);
      }
    } catch (error) {
      console.log("Error loading categories:", error);
    }
  };

  // ---------------------------
  // FETCH MEDICINES
  // ---------------------------
  const fetchMedicines = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/index.php?action=api/getMedicines`);

      if (res.data.status === "success") {
        setMedicines(res.data.data);
        console.log("Medicines loaded:", res.data.data);
      }
    } catch (error) {
      console.log("Error loading medicines:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchMedicines();
  }, []);

  // ---------------------------
  // HANDLE INPUT CHANGE
  // ---------------------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ---------------------------
  // HANDLE IMAGE UPLOAD
  // ---------------------------
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, med_image_url: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  // ---------------------------
  // ADD MEDICINE
  // ---------------------------
  const handleAdd = async () => {
    const fd = new FormData();

    fd.append("category", formData.category); // send category name
    fd.append("med_name", formData.med_name);
    fd.append("med_formula", formData.med_formula);
    fd.append("med_price", formData.med_price);
    fd.append("med_manufacturer", formData.med_manufacturer);
    fd.append("med_description", formData.med_description);

    if (formData.med_image_url) {
      fd.append("med_image_url", formData.med_image_url);
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/index.php?action=api/addMedicine`,
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
         
      );

      if (res.data.status === "success") {
        alert("Medicine added successfully!");
        fetchMedicines(); // reloads real DB data
        resetForm();
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Error adding medicine!");
    }
  };

  // ---------------------------
  // EDIT MEDICINE
  // ---------------------------
  const handleEdit = (m) => {
    setIsEditing(true);

    setFormData({
      med_id: m.id,
      med_name: m.name,
      med_formula: m.formula,
      med_price: m.price,
      med_manufacturer: m.manufacturer,
      med_description: m.description,

      category: m.category_name,

      med_image_url: "",
    });

    setPreviewImage(m.image_url ? `${API_BASE}/backend/app${m.image_url}` : null);
  };

  // ---------------------------
  // UPDATE MEDICINE
  // ---------------------------
  const handleUpdate = async () => {
    const fd = new FormData();

    fd.append("med_id", formData.med_id);
    fd.append("category", formData.category);
    fd.append("med_name", formData.med_name);
    fd.append("med_formula", formData.med_formula);
    fd.append("med_price", formData.med_price);
    fd.append("med_manufacturer", formData.med_manufacturer);
    fd.append("med_description", formData.med_description);

    if (formData.med_image_url) {
      fd.append("med_image_url", formData.med_image_url);
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/index.php?action=api/updateMedicine`,
        fd,               // send FormData directly
        {
          headers: {
            "Content-Type": "multipart/form-data" // required for FormData
          },
          withCredentials: true
        }
      );

      const data = res.data;;

      if (data.status === "success") {
        alert("Medicine updated successfully!");
        fetchMedicines();
        resetForm();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Error updating medicine!");
    }
  };

 

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      const res = await axios.delete(
        `${BASE_URL}/index.php?action=api/deleteMedicine`,
        { data: { id } },
        { withCredentials: true }
      );
      if (res.data.status === "success") {
        setMedicines(medicines.filter((m) => m.id !== id));
      }
      else if (res.data.status === "fail") {
        alert(res.data.message); // Show reason why it can't be deleted
        return;
      }

      alert("Medicine deleted successfully!");
      fetchMedicines(); // Refresh medicine list
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong. Please try again.", error);
    }
  };
  // ---------------------------
  // RESET FORM
  // ---------------------------
  const resetForm = () => {
    setFormData({
      med_id: "",
      med_name: "",
      med_formula: "",
      med_price: "",
      med_manufacturer: "",
      med_description: "",
      category: "",
      med_image_url: "",
    });

    setPreviewImage(null);
    setIsEditing(false);
  };

  return (
    <div className="med-container">
      <h2>Manage Medicines</h2>

      <div className="med-form">

        {/* CATEGORY DROPDOWN FIXED */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (

            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="med_name"
          placeholder="Medicine Name"
          value={formData.med_name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="med_formula"
          placeholder="Formula"
          value={formData.med_formula}
          onChange={handleChange}
        />
        <input
          type="number"
          name="med_price"
          placeholder="Price"
          value={formData.med_price}
          onChange={handleChange}
        />
        <input
          type="text"
          name="med_manufacturer"
          placeholder="Manufacturer"
          value={formData.med_manufacturer}
          onChange={handleChange}
        />
        <textarea
          name="med_description"
          placeholder="Description"
          value={formData.med_description}
          onChange={handleChange}
        ></textarea>

        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {previewImage && (
          <img src={previewImage} alt="Preview" className="preview-img" />
        )}

        {isEditing ? (
          <button className="update-btn" onClick={handleUpdate}>
            Update Medicine
          </button>
        ) : (
          <button className="add-btn" onClick={handleAdd}>
            Add Medicine
          </button>
        )}
      </div>

      <div className="table-wrapper">
        <table className="med-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Formula</th>
              <th>Price</th>
              <th>Category</th>
              <th>Manufacturer</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {medicines.map((m) => (
              <tr key={m.id}>
                <td>
                  {m.image_url ? (
                    <img
                      src={`${API_BASE}/backend${m.image_url}`}

                      className="table-img"
                      alt=""
                    />
                  ) : (
                    "No Image"
                  )}
                </td>

                <td>{m.name}</td>
                <td>{m.formula}</td>
                <td>Rs {m.price}</td>

                <td>
                  {m.category_name}
                </td>

                <td>{m.manufacturer}</td>
                <td>{m.description}</td>

                <td>
                  <button className="edit-btn" onClick={() => handleEdit(m)}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(m.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageMedicines;
