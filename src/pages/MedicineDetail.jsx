import { useState, useEffect } from "react";
import "../css/medicineDetail.css";
import thumbnail from "../assets/panadol1.jpg";
import { useLocation } from "react-router-dom";
import addToCartAPI from "../services/cart.jsx"
import axios from "axios"
function MedicineDetails({ product, cartItems =[],setCartItems }) {

  const { state: medicine } = useLocation();

  const [quantity, setQuantity] = useState(1);
const [loading, setLoading] = useState(true)

  // Fetch protected cart data on page load
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const cart_id = user ? user.cart_id : null;
        const res = await axios.post("http://localhost/online-pharmacy/backend/public/index.php?action=api/getCart", { cart_id }); // your protected endpoint
        if (res.data.status) {
          setCartItems(res.data.cart_items);
          // setcartInfo(res.data);
          // update state
        } else {
          console.error("Unauthorized or no cart items");
        }
      } catch (err) {
        console.error("Failed to fetch cart items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [setCartItems]);

  // Increase quantity
  const increase = async () => {

    // if (quantity <= 1) return;

    // console.log(product.quantity)

    setQuantity(quantity + 1);
    // console.log(product.quantity)

  }

  // Decrease quantity
  const decrease = async () => {

    if (quantity <= 1) return;

    setQuantity(quantity - 1);

  };



  const handleAddToCart = async () => {
    // Get cart_id from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const user_id = user.id;
    const user_email = user.email;
    const cart_id = user.cart_id;
    const productId = medicine.id
    try {
      const response = await addToCartAPI(productId, quantity, cart_id);

      if (response.status === "success") {
        alert("Added to cart!");
        // localStorage.setItem("guest_cart_id", response.cart_id);
      } else {
        alert(response.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    }
  };


  if (!medicine) return <p>Medicine data not available.</p>;


  const descriptionLines = medicine.description.split('\n'); // split by each line

  // Create an object to store each section
  const sections = {};

  // Loop through each line
  descriptionLines.forEach(line => {
    // Check if the line has a colon (:) to separate title and content
    const parts = line.split(':');
    if (parts.length > 1) {
      const title = parts[0].trim(); // e.g., "Overview"
      const content = parts.slice(1).join(':').trim(); // the rest of the line
      sections[title] = content;
    }
  });
  return (
    <div className="medicine-detail-outer-div">
      <div className="medicine-detail-container">

        <div className="medicine-image">
          <img
            src={medicine.image_url ? `http://localhost/online-pharmacy/backend${medicine.image_url}` : thumbnail}
            alt={medicine.name}
            className="medicine-image-url"
          />        </div>

        <div className="medicine-description">

          <h2 className="medicine-title">{medicine.name}</h2>

          <p>
            {sections.Overview}
          </p>

          <p className="medicine-price">Price: Rs. {medicine.price}</p>

          {/* QUANTITY BOX WORKING NOW */}
          <div className="qty-wrapper">
            <button className="qty-btn" onClick={decrease}>−</button>

            <input
              className="qty-input"
              type="text"
              value={quantity}
              readOnly
            />

            <button className="qty-btn" onClick={increase}>+</button>
          </div>

          <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>

        </div>

      </div>

      <div className="medicine-details-block">
        <h2 className="main-details-heading"> About This Medicine</h2>



        <h3 className="medicine-title">{medicine.name}</h3>
        <p className="medicine-price">Price: Rs. {medicine.price}</p>

        <h3 className="mi-heading">Overview</h3>
        <p className="mi-text">{sections.Overview}</p>

        <h3 className="mi-heading">Uses</h3>
        <p className="mi-text">{sections.Uses}</p>

        <h3 className="mi-heading">Dosage</h3>
        <p className="mi-text">{sections.Dosage}</p>

        <h3 className="mi-heading">Precautions</h3>
        <p className="mi-text">{sections.Precautions}</p>

        <h3 className="mi-heading">Storage</h3>
        <p className="mi-text">{sections.Storage}</p>
      </div>

    </div>
  );
}

export default MedicineDetails;
