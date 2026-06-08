import "../css/cart-component.css";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import {useState} from "react";
function CartProducts({ product, setCartItems }) {


  const user = JSON.parse(localStorage.getItem("user")); // parse string to object
  const cart_id = user?.cart_id; // optional chaining to avoid errors
  const [itemQuantity, setItemQuantity] = useState(1);

  // Increase quantity
  const increase = async () => {
    try {
      const res = await axios.post(
        "http://localhost/online-pharmacy/backend/public/index.php?action=api/addToCart",
        {
          medicine_id: product.medicine_id,
          cart_id,
          quantity: 1
        }
      );

      if (!res.data.status) {
        alert("Failed to update cart");
        return;
      }

      // Update global cart state
      setCartItems(prev =>
        prev.map(item =>
          item.cart_item_id === product.cart_item_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );

      setItemQuantity(itemQuantity + 1);

    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  // Decrease quantity
  const decrease = async () => {
    if (product.quantity <= 1) return;

    try {
      const res = await axios.post(
        "http://localhost/online-pharmacy/backend/public/index.php?action=api/removeFromCart",
        {
          cart_id,
          medicine_id: product.medicine_id,
          quantity: 1
        }
      );

      if (!res.data.status) {
        alert("Failed to update cart");
        return;
      }

      setCartItems(prev =>
        prev.map(item =>
          item.cart_item_id === product.cart_item_id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );


      setItemQuantity(itemQuantity - 1);

    } catch (err) {
      console.error("Remove from cart error:", err);
    }
  };

const deleteCartItem = async () => {
  try {
    const response = await axios.post(
      "http://localhost/online-pharmacy/backend/public/index.php?action=api/removeFromCart",
      {
        cart_id,
        medicine_id: product.medicine_id,
        quantity: product.quantity
      }
    );

    if (response.data.status === true) {

      // ✅ REMOVE ITEM FROM UI
      setCartItems(prev =>
        prev.filter(item => item.cart_item_id !== product.cart_item_id)
      );

      alert("Cart item deleted successfully");
    } else {
      alert(response.data.message);
    }

  } catch (err) {
    console.error(err);
    alert("Failed to delete cart item");
  }
};


  return (
    <div className="cart-product-container">

      <div className="cart-product-thumbnail">
        <img
          src={`http://localhost/online-pharmacy/backend${product.image_url}`}
          alt={product.name}
        />
      </div>

      <div className="cart-product-detail">
        <div className="product-detail">
          <h3>{product.name}</h3>
        </div>

        {/* Quantity */}
        <div className="qty-wrapper-2">
          <button className="qty-btn-2" onClick={decrease}>−</button>
          <input
            className="qty-input-2"
            type="text"
            value={product.quantity}
            readOnly
          />
          <button className="qty-btn-2" onClick={increase}>+</button>
        </div>

        {/* Price */}
        <div className="total-price">
          <h3>Price</h3>
          <p className="cart-product-price">
            Rs. {(Number(product.item_price) * Number(product.quantity)).toFixed(2)}
          </p>
        </div>

        <FaTrash onClick={deleteCartItem} />
      </div>
    </div>
  );
}

export default CartProducts;
