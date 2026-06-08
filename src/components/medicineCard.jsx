
import "../css/medicineCard.css";
import thumbnail from '../assets/panadol1.jpg';
import { Link } from "react-router-dom";
import addToCartAPI from "../services/cart.jsx"

function MedicineCard({ medicine }) {

  if (!medicine) {
    return null;
  }

  // Define fallback values in case the property is missing, though the API suggests they exist.
  const imageUrl = medicine.image_url || '';
  const name = medicine.name || 'Unknown Medicine';
  const price = medicine.price || 'N/A';
  const productId = medicine.id

  // Construct the full URL safely
  const fullImageUrl = `http://localhost/online-pharmacy/backend${imageUrl}`;

  const handleAddToCart = async () => {
    const quantity = 1;
    // Get cart_id from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const user_id = user.id;
    const user_email = user.email;
    const cart_id = user.cart_id;
    try {
      // console.log(productId, quantity, cart_id)
      const response = await addToCartAPI(productId, quantity, cart_id);
console.log(medicine, user, "helloooooooo");

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

  return (
    <>
      <div className="medicine-card">
        <div className="med-thumbnail-div">
          {/* Use the local thumbnail if the image_url is missing */}
          <Link to={`/medicine/${medicine.id}`} state={medicine}>
            <img
              src={imageUrl ? fullImageUrl : thumbnail}
              alt={medicine.name}
              className="med-thumbnail"
            />
          </Link>
        </div>
        <div className="med">
          {/* Use the defined constants */}
          <h3 className="med-name">{name}</h3>
          <p className="med-price">{price}</p>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </>
  );
}

export default MedicineCard;