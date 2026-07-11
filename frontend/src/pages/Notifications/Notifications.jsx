import { useEffect, useState } from "react";
import {
  getNotifications,
  deleteNotification,
} from "../../services/notificationService";

import AddNotification from "./AddNotification";
import EditNotification from "./EditNotification";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete notification?")) return;

    await deleteNotification(id);

    fetchNotifications();
  };

  return (
    <div>
      <h1>Notifications</h1>

      <EditNotification
        selectedNotification={selectedNotification}
        fetchNotifications={fetchNotifications}
        onClose={() => setSelectedNotification(null)}
      />

      <AddNotification
        fetchNotifications={fetchNotifications}
      />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Message</th>
            <th>Sent At</th>
            <th>Read</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {notifications.map((notification) => (
            <tr key={notification.id}>
              <td>{notification.id}</td>
              <td>{notification.user_id}</td>
              <td>{notification.message}</td>
              <td>{notification.sent_at}</td>
              <td>{notification.is_read ? "Yes" : "No"}</td>

              <td>
                <button
                  onClick={() =>
                    setSelectedNotification(notification)
                  }
                >
                  Edit
                </button>

                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() =>
                    handleDelete(notification.id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Notifications;