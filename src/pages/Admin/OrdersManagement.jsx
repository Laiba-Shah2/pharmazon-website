import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/OrdersManagement.css";
import API_BASE from "../../config.js";

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_BASE}/backend/public/index.php?action=api/getOrders`);
        if (response.data.status) {
          setOrders(response.data.orders);
        } else {
          alert("Failed to fetch orders");
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        alert("Error fetching orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Approve order function
  const approveOrder = async (orderId) => {
    try {
      const response = await axios.post(`${API_BASE}/backend/public/index.php?action=api/approveOrders`, { order_id: orderId });
      if (response.data.status) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, order_status: "approved" } : order
          )
        );
        alert("Order approved!");
      } else {
        alert("Failed to approve order");
      }
    } catch (err) {
      console.error("Error approving order:", err);
      alert("Failed to approve order");
    }
  };
  const shipOrder = async (orderId) => {

    try {

      const response = await axios.post(`${API_BASE}/backend/public/index.php?action=api/shipOrders`, { order_id: orderId });
      if (response.data.status) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, order_status: "shipped" } : order
          )
        );
        alert("Order Shipped Successfully")
      }
      else {
        alert("Failed to ship order")
        console.log(response.data)
      }

    }

    catch (error) {

      console.error("Error shipping order:", err);
      alert("Failed to ship order");
    }
  }




  const deliverOrder = async (orderId) => {
    try {

      const response = await axios.post(`${API_BASE}/backend/public/index.php?action=api/deliverOrders`, { order_id: orderId });

      if (response.data.status == true || response.data.data == "success") {

        setOrders((prevOrders) =>

          prevOrders.map((order) => {
            order.id == orderId ? { ...order, order_status: "delivered" } : order
          }))
      }

      else {
        alert("Failed to deliver order");
        console.log(response.data)

      }
    }
    catch (error) {
      alert("Error delivering order");
      console.log(error)
    }



  }
  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div className="orders-container">
      <h2>Orders</h2>
      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer Name</th>
              <th>City</th>
              <th>Shipping Address</th>
              <th>Phone No</th>
              <th>Total Price</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.name}</td>
                <td>{order.city}</td>
                <td>{order.shipping_address}</td>
                <td>{order.phone_no}</td>
                <td>Rs. {order.total_price}</td>
                <td>{new Date(order.order_date).toLocaleString()}</td>
                <td>{order.order_status}</td>
                <td>
                  {order.order_status === "pending" ? (
                    <button
                      type="button"

                      className="approve-btn"
                      onClick={() => approveOrder(order.id)}
                    >
                      Approve
                    </button>

                  ) : order.order_status === "approved" ? (

                    <button
                      type="button"

                      className="ship-btn"
                      onClick={() => shipOrder(order.id)}
                    >
                      Shipped
                    </button>
                  ) : order.order_status === "shipped" ?
                    (

                      <button
                      type="button"
                        className="deliver-btn"
                        onClick={() => deliverOrder(order.id)}
                      >
                        Delivered
                      </button>

                    ) : null}

                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="9">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
