import { useNavigate } from "react-router-dom";
import "../css/order-summary.css";

function OrderSummary({ cartItems }) {
  const navigate = useNavigate();

  // Safety check
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return (
      <div className="order-summary">
        <h2>Order Summary</h2>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  // Convert strings to numbers safely
  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc + Number(item.item_price) * Number(item.quantity),
    0
  );

  const totalItems = cartItems.reduce(
    (acc, item) => acc + Number(item.quantity),
    0
  );

  const shipping = 200;
  const total = subtotal + shipping;

  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>

      <div className="order-detail">
        <p>Total Items</p>
        <p>{totalItems}</p>
      </div>

      <div className="order-detail">
        <p>Subtotal</p>
        <p>Rs. {subtotal.toFixed(2)}</p>
      </div>

      <div className="order-detail">
        <p>Shipping Cost</p>
        <p>Rs. {shipping.toFixed(2)}</p>
      </div>

      <div className="order-detail">
        <p>Total Amount</p>
        <p>Rs. {total.toFixed(2)}</p>
      </div>

      <button className="checkout-btn" onClick={handleProceedToCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default OrderSummary;
