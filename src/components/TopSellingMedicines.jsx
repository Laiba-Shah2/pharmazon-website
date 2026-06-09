import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/topSelling.css";
import API_BASE from "../config.js";

export default function TopSellingMedicines() {
  const [topMedicines, setTopMedicines] = useState([]);

  useEffect(() => {
    const fetchTopSelling = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/backend/public/index.php?action=api/dashboard-overview`,
        );

        // Because some invalid request is adding garbage text after JSON,
        // We validate that topSelling exists before setting it.
        if (res.data && Array.isArray(res.data.topSelling)) {
          setTopMedicines(res.data.topSelling);
        } else {
          console.warn("topSelling missing, raw response:", res.data);
        }
      } catch (error) {
        console.error("Error fetching top selling medicines:", error);
      }
    };

    fetchTopSelling();
  }, []);

  return (
    <div className="top-selling-container">
      <h3 className="top-selling-title">Top Selling Medicines</h3>

      <ul className="top-selling-list">
        {topMedicines.map((medicine, index) => (
          <li key={index} className="top-selling-item">
            <div className="left-wrapper">
              <span className="rank-badge">#{index + 1}</span>
              <span className="medicine-name">{medicine.name}</span>
            </div>
            <span className="medicine-sold">{medicine.total_sold} sold</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
