import React, { useState, useEffect } from "react";
import axios from "axios";
import MedicineCard from "../components/medicineCard";
import "../css/medicines.css";
import API_BASE from "../config.js";


function FeaturedMedicines() {
    // State to hold the fetched medicine data
    const [featuredMedicines, setFeaturedMedicines] = useState([]);


    // Function to fetch featured medicines
    const fetchFeaturedMedicines = async () => {
        try {
            const response = await axios.get(
                `${API_BASE}/backend/public/index.php?action=api/getMedicines`
            );

            if (response.data.status === "success") {
                if (response.data.data) {
                    setFeaturedMedicines(response.data.data);
                } else {
                    console.warn("API returned success status but no data.");
                }
                
                console.log("fetch featured medicines:", response.data);

            } else {
                console.log("Failed to fetch featured medicines:", response.data.status);
            
            }
        } catch (error) {
            console.error("Error fetching featured medicines:", error);
        }
    };

    // Limit display to 8 items
    const featuredItemsToDisplay = featuredMedicines.slice(0, 8);

       // Fetch data on component mount
    useEffect(() => {
        fetchFeaturedMedicines();
    }, []);

    return (
        <>
            <div className="medicine-container">
                <h1 className="medicine-heading">Featured Medicines</h1>
                <div className="medicine-inner-box">
                    {featuredItemsToDisplay.map((med, index) => (
                        <MedicineCard 
                            key={med.id || index} 
                            medicine={med} 
                            className="Medicine-card" 
                        />
                    ))}
                    {featuredMedicines.length === 0 && <p>No featured medicines available.</p>}
                </div>
                <div className="see-more-medicine-btn-div">
                    <button className="see-more-medicine-btn">See More</button>
                </div>
            </div>
        </>
    );
}

export default FeaturedMedicines;
