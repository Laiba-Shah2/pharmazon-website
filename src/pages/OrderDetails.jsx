import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/orderDetails.css";
import API_BASE from "../config.js";

export default function OrderDetails() {
  const { id } = useParams(); // gets :id from route
  const [orderDetail, setOrderDetail] = useState([]);
  const [orderItemDetail, setOrderItemDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  // Fetch order details
  const getOrderDetails = async (orderId) => {
    try {
      const response = await axios.post(
        `${API_BASE}/backend/public/index.php?action=api/getOrderDetail`,
        { order_id: id }
      );

      if (response.data.status === true || response.data.status === "success") {
        setOrderDetail(response.data.order);
      } else {
        alert("Failed to fetch order details: " + response.data.message);
        console.log(response.data);
      }
    } catch (err) {
      alert("Error fetching order details: " + err.message);
      console.error(err);
    }
  };

  // Fetch order items
  const getOrderItemDetails = async (id) => {
    try {
      const response = await axios.post(
        `${API_BASE}/backend/public/index.php?action=api/getOrderItemDetails`,
        { order_id: id }
      );

      if (response.data.status === true || response.data.status === "success") {
        setOrderItemDetail(response.data.order_items);
        console.log(response.data);

      } else {
        alert("Failed to fetch order items: " + response.data.message);
        console.log(response.data);
      }
    } catch (err) {
      alert("Error fetching order items: " + err.message);
      console.log(err);
    } 
  };

  useEffect(() => {
    if (id) {
      getOrderDetails(id);
      getOrderItemDetails(id);
    }
  }, [id]);




const handleCancel = async () => {
  if (!window.confirm("Are you sure you want to cancel this order?")) return;

  setIsCancelling(true);
  try {
    const response = await axios.post(
      `${API_BASE}/backend/public/index.php?action=api/cancelOrder`,
      {
        order_id: orderDetail.id, // use current order's id
      }
    );

    if (response.data.status) {
      alert("Order cancelled successfully!");
      // Update frontend: change order status
      setOrderDetail((prev) => ({ ...prev, order_status: "Cancelled" }));
    } else {
      alert("Failed to cancel order: " + response.data.message);
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong!");
  }
  setIsCancelling(false);
};







  
  if (loading) return <p>Loading order details...</p>;
  if (!orderDetail) return <p>Order not found.</p>;

  return (
    <div className="order-details">
      <h1>Order Details</h1>
<div className="order-details-box">

      <div className="order-inner-div">
        <h3>Tracking Number:  {orderDetail.tracking_no}</h3>
        <p><b>Customer Name:</b>  {orderDetail.name}</p>
        <p><b>Address:</b>  {orderDetail.shipping_address}</p>
        <p><b>Contact Number:</b>  {orderDetail.phone_no}</p>
        <p><b>Order Date:</b>  {orderDetail.order_date}</p>
        <p><b>Total Price:</b>  Rs. {orderDetail.total_price}</p>
        <p><b>Order Status:</b>  {orderDetail.order_status}</p>
      </div>
     <div className="order-items-list-wrapper">

         <h2>Order Items</h2>
      {orderItemDetail.length === 0 ? (
        <p>No items in this order.</p>
      ) : (
        <div className="order-items-list">
          {orderItemDetail.map((item, index) => (
            <div key={index} className="order-item">
              <img
                src={
                  item.image_url
                    ? `${API_BASE}/backend${item.image_url}`
                    : "/placeholder.png"
                }
                alt={item.name}
              />
              <div className="order-item-description">
              <p><b>Medicine:</b> {item.name}</p> 
              <p><b>Quantity:</b> {item.quantity}</p> 
              <p><b>Price:</b> Rs. {item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* <button onClick={handleCancel} disabled={isCancelling}>
        {isCancelling ? "Cancelling..." : "Cancel Order"}
      </button> */}
      </div>

      </div>
    </div>
  );
}
