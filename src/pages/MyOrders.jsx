import React from "react";
import { useState, useEffect } from "react";
import "../css/myOrders.css";
import axios from "axios";
import {Link} from "react-router-dom";
function MyOrders() {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user ? user.id : null;


  // Example orders (later you can fetch these from your database)
  useEffect(() => {
    const getOrders = async () => {

      try{
      const response = await axios.post("http://localhost/online-pharmacy/backend/public/index.php?action=api/getCustomerOrders", {user_id:user_id});
      if(response.data.status===true || response.data.status=="success"){
    setOrders(response.data.orders);
    console.log(response.data);
      }else{
        alert("Failed to fetch orders." + response.data.orders);
        console.log(response.data);
      }
    }catch(error){
        console.error("Error fetching orders:", error);
      }

    }
getOrders()
  }, [])


  const openOrderDetails = (orderId)=>{


  }

  return (
    <div className="orders-wrapper">
      <div className="orders-container">
        <h1 className="orders-title">My Orders</h1>

        {orders.length === 0 ? (
          <p className="no-orders">You have no orders yet.</p>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <Link to={`/order/${order.id}`} key={order.id} style={{ textDecoration: 'none' , color: 'inherit'}}>
              <div className="order-card" key={order.id} onClick={()=>{openOrderDetails(order.id)}}>
                <div className="order-info">
                  <h2 className="order-id">{order.tracking_no}</h2>
                  <p><strong>Date:</strong> {order.order_date}</p>
                  <p><strong>Amount:</strong> {order.total_price}</p>
                  <p><strong>Payment:</strong> Cash on Delivery</p>
                </div>

                <div className={`order-status ${order.order_status.toLowerCase()}`}>
                  {order.order_status}
                </div>
              </div>

              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;
