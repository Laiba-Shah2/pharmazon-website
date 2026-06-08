import React from "react";
import "../css/order-confrimation.css";
import { Link } from "react-router-dom";

function OrderConfirmation() {
  return (
    <div className="oc-wrapper">
      <div className="oc-card">
        <h1 className="oc-title">Order Confirmed!</h1>
        <p className="oc-subtitle">Thank you for shopping with us.</p>

        <div className="oc-details">
          <p>Your order has been placed successfully.</p>
          <p>Payment Method: <strong>Cash on Delivery</strong></p>
          <p>We will contact you shortly to confirm your order.</p>
        </div>

        <Link to="/" className="oc-home-btn">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmation;
