import React, { useEffect, useState } from "react";
import "../css/recentOrders.css";
import API_BASE from "../config.js";

const RecentOrderTable = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // ---------- DUMMY DATA ----------
    const dummyOrders = [
      {
        id: 101,
        customer: "Ali Raza",
        status: "Pending",
        total: 1200,
        date: "2025-11-26",
      },
      {
        id: 102,
        customer: "Ayesha Khan",
        status: "Approved",
        total: 850,
        date: "2025-11-25",
      },
      {
        id: 103,
        customer: "Ahmed Ali",
        status: "Shipped",
        total: 2300,
        date: "2025-11-24",
      },
      {
        id: 104,
        customer: "Fatima Noor",
        status: "Delivered",
        total: 540,
        date: "2025-11-23",
      },
      {
        id: 105,
        customer: "Sara Ahmed",
        status: "Cancelled",
        total: 700,
        date: "2025-11-22",
      },
    ];

    // Simulate API load delay
    setTimeout(() => {
      setOrders(dummyOrders);
    }, 500);
  }, []);

  return (
    <div className="order-summary-container">
      <h2 className="order-summary-title">Order Summary</h2>

      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Total (Rs.)</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-orders">
                No orders found.
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customer}</td>

                <td>
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>

                <td>{order.total}</td>
                <td>{order.date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrderTable;
