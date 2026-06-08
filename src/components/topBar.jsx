import React from "react";
import "../css/topbar.css";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

function Topbar() {
  return (
    <div className="topbar">
      <div className="topbar-left">
        {/* <div className="search-box">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search..." />
        </div> */}
      </div>

      <div className="topbar-right">
        <FaBell className="icon" />
        <div className="admin-profile">
          <FaUserCircle className="admin-icon" />
          <span>Admin</span>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
