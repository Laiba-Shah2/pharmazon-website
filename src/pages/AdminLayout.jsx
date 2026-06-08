import { Outlet } from "react-router-dom";
import Sidebar from "../components/sideBar.jsx";
import Topbar from "../components/topBar.jsx";

import "../css/adminLayout.css";

export default function Layout({  }) {
 

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-section">
        <Topbar />
        <div className="content-area">
          <Outlet />

        </div>
      </div>
    </div>
  );
}
