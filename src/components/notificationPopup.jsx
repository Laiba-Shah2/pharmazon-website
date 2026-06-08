import { useState, useEffect } from "react";
import axios from "axios";
import "../css/notificationPopup.css";

function NotificationsPopup() {
  const [notifications, setNotifications] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user?.id;

  useEffect(() => {
    if (!user_id) return;

    const fetchNotifications = async () => {
      try {
        const response = await axios.post(
          "http://localhost/online-pharmacy/backend/public/index.php?action=api/getNotifications",
          { user_id }
        );

        if (response.data.status === true || response.data.status === "success") {
          setNotifications(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching notifications", error);
      }
    };

    fetchNotifications();
  }, [user_id]);

  return (
    <div className="notifyPopupBox">
      <h3 className="notifyTitle">Notifications</h3>

      <div className="notificationsList">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div className="notificationItem" key={notification.id}>
              {notification.message}
            </div>
          ))
        ) : (
          <p className="noNotification">No notifications</p>
        )}
      </div>
    </div>
  );
}

export default NotificationsPopup;
