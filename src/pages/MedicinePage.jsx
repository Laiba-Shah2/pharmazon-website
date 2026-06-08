import { useEffect, useState, useCallback } from "react";
import SearchBar from "../components/searchBar.jsx";
import CategorySidebar from "../components/categorySidebar.jsx";
import MedicineCard from "../components/medicineCard.jsx";
import "../css/medicinePage.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

function MedicinePage() {
  const [medicines, setMedicines] = useState([]);
  const location = useLocation();
  const [filters, setFilters] = useState({
    category: null,
    price_min: null,
    price_max: null,
    q: null,
  });

  // Wrapped in useCallback for stability in useEffect dependencies
  const fetchMedicines = useCallback(async (newFilters = {}) => {
    // 1. Merge current filters state with new filters passed to this function
    const effectiveFilters = { ...filters, ...newFilters };
    setFilters(effectiveFilters); // Save the merged filters to state

    const { category, price_min, price_max, q } = effectiveFilters;

    // 2. Cleanup logic: Dynamically build the payload, omitting null/empty values
    const payload = {};
    if (category !== null && category !== "") {
      payload.category = category;
    }
    if (price_min !== null && price_min !== "") {
      payload.price_min = price_min;
    }
    if (price_max !== null && price_max !== "") {
      payload.price_max = price_max;
    }
    if (q !== null && q !== "") {
      payload.q = q;
    }

    // 3. API Call
    try {
      const response = await axios.post(
        "http://localhost/online-pharmacy/backend/public/index.php?action=api/filterMedicine",
        payload // Sending the cleaned payload object
      );
      
      if (response.data.status === "success") {
        setMedicines(response.data.data);
        console.log("Filtered Data:", response.data);
      } else {
        setMedicines([]);
        alert("No medicine found for the selected filters!");
      }
    } catch (error) {
      console.error("Error fetching medicines:", error);
      alert("Error fetching medicines!");
    }
  }, [filters]); 

  // This hook handles the initial load when navigating from the category cards.
  useEffect(() => {
    const initialCategory = location.state?.category || null;

    if (initialCategory !== null && initialCategory !== filters.category) {
        // This triggers the first fetch based on navigation state
        fetchMedicines({ category: initialCategory });
    } else if (initialCategory === null && filters.category === null && medicines.length === 0) {
        // Initial page load without any filters (to load all medicines)
        fetchMedicines({});
    }
    
    // Clean up location state after use
    if (location.state?.category) {
      window.history.replaceState({}, document.title);
    }
    
  }, [location.state, fetchMedicines, filters.category, medicines.length]); 

  return (
    <div className="medicine-page-container">
      <h1 className="page-title">All Medicines</h1>

      <SearchBar
        onSearch={(q) =>
          fetchMedicines({
            ...filters,
            q: q,
          })
        }
      />

      <div className="important-info">
        <CategorySidebar
          // CRITICAL FIX: Pass the currently active category ID down
          activeCategoryId={filters.category}
          onFilterChange={(newFilterValues) =>
            fetchMedicines(newFilterValues)
          }
        />

        <div className="medicine-grid">
          {medicines.map((med, index) => (
            <MedicineCard key={med.id || index} medicine={med} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MedicinePage;