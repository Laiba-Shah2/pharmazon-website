import React, { useState, useEffect } from "react"; 
import axios from "axios"; 
import { useNavigate } from "react-router-dom"; 
import "../css/shopByCategories.css";

function Categories() {

    const [categories, setcategories] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchCategories();
    }, []);


    const fetchCategories = async () => {
        try {
            const response = await axios.get(
                "http://localhost/online-pharmacy/backend/public/index.php?action=api/getCategory"
            );

            // Assuming your PHP returns status: "success" (string) or status: true (boolean)
            if (response.data.status === "success" || response.data.status === true) {
                // Ensure response.data.data exists before setting state
                if (response.data.data) { 
                    console.log(response.data.data)
                    setcategories(response.data.data); 
                } else {
                    console.warn("No category data found in response!"); // Changed alert to console.warn
                }
            } else {
                console.warn("No Category found!"); // Changed alert to console.warn
            }
        } catch (error) {
            console.error("Error Fetching categories:", error); // Use console.error for errors
            // alert("Error Fetching categories!"); // Removed alert
        }
    };

    const handleCategoryClick = (catId) => {
        // Correctly redirects to Medicine page with the category ID in the state
        navigate("/medicines", { state: { category: catId } });
    };


    return (
        <div className="categories-container">
            <h2 className="cat-heading">Shop by Category</h2>
            <div className="cat-grid">
                {categories.map((cat, index) => (
                    <div className="cat-card" key={cat.id || index} onClick={() => handleCategoryClick(cat.id)} > 
                        <div className="cat-img-box">
                            <img src={`http://localhost/online-pharmacy/backend${cat.image_url}`} 
                                alt={cat.name} 
                            />
                        </div>
                        <p className="cat-title">{cat.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default Categories;