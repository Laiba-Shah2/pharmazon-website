import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/sideBar.css";
import { 
  FaTachometerAlt, FaPills, FaList, FaBoxes, 
  FaFileAlt, FaCheckCircle, FaShoppingCart, FaSignOutAlt 
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation(); 

  const tabs = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admin" },
    { name: "Orders", icon: <FaShoppingCart />, path: "/admin/orders" },
    { name: "Medicines", icon: <FaPills />, path: "/admin/medicines" },
    { name: "Categories", icon: <FaList />, path: "/admin/categories" },
    { name: "Inventory", icon: <FaBoxes />, path: "/admin/inventory" },
    { name: "Reports", icon: <FaFileAlt />, path: "/admin/reports" },
  ];

  const handleLogout = async () => {
  localStorage.removeItem("token");

  try {
    await fetch("http://localhost/online-pharmacy/backend/public/index.php?action=api/logout", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    });
  } catch (err) {
    console.error("Logout API failed:", err);
  }

  // Redirect to login page
  window.location.href = "/login";
};

  return (
    <div className="sidebar">
      <h2 className="sidebar-logo">PharmaAdmin</h2>

      <ul className="sidebar-menu">
        {tabs.map((tab) => (
          <li
            key={tab.name}
            className={location.pathname === tab.path ? "active" : ""}
          >
            <Link to={tab.path}>
              {tab.icon} {tab.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        <li onClick={handleLogout}><FaSignOutAlt /> Logout</li>
      </div>
    </div>
  );
}

export default Sidebar;
