import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/Catalogue.css";
import API_BASE from "../../config.js";

function Catalogue() {
  const [catalogues, setCatalogues] = useState([]);

  // used for BOTH adding and updating
  const [formData, setFormData] = useState({
    name: "",
    no_of_medicines: "",
    med_image_url: null,
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCatalogues();
  }, []);

  async function fetchCatalogues() {
    try {
      const res = await axios.get(
        `${API_BASE}/backend/public/index.php?action=api/getCategory`
        ,  { withCredentials: true }
      );

      let data = res.data.data;
      setCatalogues(data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }

  // handle inputs (text + file)
  function handleChange(e) {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  }

  // ADD category
  async function handleAdd() {
    if (!formData.name || !formData.no_of_medicines || !formData.med_image_url) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("no_of_medicines", formData.no_of_medicines);
      fd.append("med_image_url", formData.med_image_url);

      const res = await axios.post(
        `${API_BASE}/backend/public/index.php?action=api/addCategory`,
        fd,
        { headers: { "Content-Type": "multipart/form-data",withCredentials: true } }
        
      );

      if (res.data.status === "success") {
        setCatalogues([...catalogues, res.data.data]);
        resetForm();
      } else {
        alert(res.data.message || "Failed to add category");
      }
    } catch (err) {
      console.error("Add error:", err);
    }
  }

  // FILL FORM WHEN EDIT BUTTON IS CLICKED
  function startEdit(cat) {
    setEditingId(cat.id);
    setFormData({
      name: cat.name,
      no_of_medicines: cat.no_of_medicines,
      med_image_url: null, // new image optional
    });
  }

  // UPDATE CATEGORY
  async function handleUpdate() {
    try {
      const fd = new FormData();
      fd.append("id", editingId);
      fd.append("name", formData.name);
      fd.append("no_of_medicines", formData.no_of_medicines);

      if (formData.med_image_url) {
        fd.append("med_image_url", formData.med_image_url);
      }

      const res = await axios.post(
        `${API_BASE}/backend/public/index.php?action=api/updateCategory`,
        fd,
        { headers: { "Content-Type": "multipart/form-data", withCredentials: true } }
        
      );

      if (res.data.status === "success") {
        const updated = res.data.data; // backend sends updated row

        // 🔥 FIX: Update UI instantly WITHOUT needing fetch again
        setCatalogues(prev =>
          prev.map(cat =>
            cat.id === editingId
              ? {
                ...cat,
                name: updated.name,
                no_of_medicines: updated.no_of_medicines,
                image_url: updated.image_url || cat.image_url
              }
              : cat
          )
        );

        resetForm();
        setEditingId(null);
      } else {
        alert(res.data.message || "Failed to update");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  }


  function resetForm() {
    setFormData({
      name: "",
      no_of_medicines: "",
      med_image_url: null,
    });
  }

  // DELETE CATEGORY
  const deleteCategory = async (id) => {
    const confirmed = window.confirm("Are you sure?");
    if (!confirmed) return;

    try {
      const res = await axios.post(
  `${API_BASE}/backend/public/index.php?action=api/deleteCategory`,
  { id },                     // this is the data/body
  { withCredentials: true }   // this is the config
);


      const text = await res.text();
      console.log("RAW RESPONSE >>>", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        alert("Invalid server response.");
        return;
      }

      if (data.status === "success") {
        setCatalogues((prev) => prev.filter((cat) => cat.id !== id));
      } else {
        alert(data.message || "Failed to delete");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting category");
    }
  };

  return (
    <div className="catalogue-container">
      <h2>Medicine Catalogues</h2>

      {/* Form for Add / Update */}
      <div className="add-catalogue">
        <input
          type="text"
          placeholder="Catalogue Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="number"
          placeholder="No. of Medicines"
          name="no_of_medicines"
          value={formData.no_of_medicines}
          onChange={handleChange}
        />

        <input
          type="file"
          name="med_image_url"
          accept="image/*"
          onChange={handleChange}
        />

        {editingId ? (
          <button onClick={handleUpdate} className="update-btn">
            Update Catalogue
          </button>
        ) : (
          <button onClick={handleAdd} className="add-btn">
            Add Catalogue
          </button>
        )}
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="catalogue-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>No. of Medicines</th>
              <th>Image</th>
              <th className="action-cln">Actions</th>
            </tr>
          </thead>

          <tbody>
            {catalogues.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.name}</td>
                <td>{cat.no_of_medicines}</td>
                <td>
                  <img
                    src={`${API_BASE}/backend${cat.image_url}`}
                    alt={cat.name}
                    className="catalogue-image"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                  {console.log(cat)}
                </td>
                <td>
                  <button onClick={() => startEdit(cat)} className="edit-btn">
                    Edit
                  </button>
                  <button onClick={() => deleteCategory(cat.id)} className="delete-btn">
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

export default Catalogue;
