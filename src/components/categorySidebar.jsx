import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/categorySidebar.css"; // FIX: Adjusted path to resolve import error in compilation environment

function CategorySidebar({ onFilterChange, activeCategoryId }) {
  // State to store categories fetched from the backend (ID + Name)
  const [fetchedCategories, setFetchedCategories] = useState([]);
  
  // State to store the ID of the currently selected category (null for "All")
  // const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  // 1. Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost/online-pharmacy/backend/public/index.php?action=api/getCategory"
        );
        if (response.data.status === "success" && response.data.data) {
          setFetchedCategories(response.data.data);
        } else {
          console.warn("Could not load categories.");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []); // Run once on mount

  // 2. Function to pass the current filter set (using arguments for freshness)
  const applyFilters = (categoryId, priceMin, priceMax) => {
    if (onFilterChange) {
      onFilterChange({ 
        category: categoryId, 
        price_min: priceMin, 
        price_max: priceMax 
      });
    }
  };

  // 3. Apply default filter on mount (loads all medicines initially)
  // useEffect(() => {
  //   // Send null for category ID to load all medicines
  //   applyFilters(null, priceRange.min, priceRange.max);
  // }, [fetchedCategories]); // Re-run once categories are loaded

  // Handler for category clicks
  const handleCategoryClick = (id) => {
    // setSelectedCategoryId(id);
    // Send the ID back to the parent MedicinePage
    applyFilters(id, priceRange.min, priceRange.max);
  };

  // Handler for price input changes
  const handlePriceChange = (field, value) => {
    let newMin = priceRange.min;
    let newMax = priceRange.max;

    if (field === 'min') {
      newMin = value;
    } else {
      newMax = value;
    }
    
    setPriceRange({ min: newMin, max: newMax });
    
    // Use the latest price values and the current selected Category ID
    // applyFilters(selectedCategoryId, newMin, newMax);
    applyFilters(activeCategoryId, newMin, newMax);
  };


  return (
    <div className="sidebar-container">
      <div className="sidebar-section">
        <h3 className="sidebar-title">Categories</h3>
        <ul className="category-list">
          {/* Option to view All Medicines */}
         <li
  // BEFORE: className={selectedCategoryId === null ? "active-category" : ""}
  className={activeCategoryId === null ? "active-category" : ""} // USE THIS LINE
  onClick={() => handleCategoryClick(null)}
>
  All Medicines
</li>

          {/* Map through dynamically fetched categories */}
          {fetchedCategories.map((cat) => (
            <li
              key={cat.id}
              className={activeCategoryId === cat.id ? "active-category" : ""}
              onClick={() => handleCategoryClick(cat.id)}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">Price Range</h3>
        <div className="price-inputs">
          <input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => handlePriceChange('min', e.target.value)}
          />
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => handlePriceChange('max', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default CategorySidebar;