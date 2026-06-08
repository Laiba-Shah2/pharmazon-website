
import RecentOrderTable from "./recentOrderTable.jsx";

export default function Orders() {
  const orders = [
    {
      id: 1001,
      customer: "Ali Khan",
      status: "Pending",
      total: 1200,
      date: "Jan 10, 2025"
    },
    {
      id: 1002,
      customer: "Sana",
      status: "Delivered",
      total: 850,
      date: "Jan 09, 2025"
    },
    {
      id: 1003,
      customer: "Hassan",
      status: "Approved",
      total: 1500,
      date: "Jan 08, 2025"
    }
  ];

  return (
    <div>
      <RecentOrderTable orders={orders} />
    </div>
  );
}
