import React, { useEffect, useState } from "react";
import axios from "axios";

import TopSellingMedicines from "../../components/TopSellingMedicines.jsx";
import RecentOrderTable from "../../components/recentOrderTable.jsx";
import QuickActions from "../../components/quickActions.jsx";
import SummaryCards from "../../components/SummaryCards.jsx";

function AdminDashboard() {
  const BASE_URL = "http://localhost/online-pharmacy/backend/public";

  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/index.php?action=api/dashboard-overview`
        );

        const data = res.data;

        // Map API response to metrics for SummaryCards
        setMetrics([
          { title: "Total Orders", value: data.totalOrders?.total || 0 },
          { title: "Pending Orders", value: data.pendingOrders?.total || 0 },
          { title: "Approved Orders", value: data.approvedOrders?.total || 0 },
          { title: "Today Sales", value: data.todaySales?.total || 0 },
          { title: "Total Stock Qty", value: data.stockCount?.total || 0 },
          { title: "Low Stock Items", value: data.lowStock?.length || 0 },
        ]);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, []);

  const styling = {
    backgroundColor: "#127c712c",
  };

  return (
    <div style={styling}>
      <SummaryCards metrics={metrics} />
      <TopSellingMedicines />
      <QuickActions />
      <RecentOrderTable />
    </div>
  );
}

export default AdminDashboard;
