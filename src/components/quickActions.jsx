import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/quickActions.css";

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    { title: "Add New Medicine", path: "/admin/medicines" },
    { title: "Approve Orders", path: "/admin/orders" },
    { title: "View Inventory", path: "/admin/inventory" },
    { title: "Generate Reports", path: "/admin/reports" },
  ];

  return (
    <div className="quick-actions-wrapper">
      <h2 className="quick-actions-heading">Quick Actions</h2>

      <div className="quick-actions-container">
        {actions.map((action, index) => (
          <button
            key={index}
            className="quick-action-btn"
            onClick={() => navigate(action.path)}
          >
            {action.title}
          </button>
        ))}
      </div>
    </div>
  );
}
