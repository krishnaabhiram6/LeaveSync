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
  const [search, setSearch] = useState("");

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
    if (!window.confirm("Delete Notification?")) return;

    try {
      await deleteNotification(id);

      alert("Notification Deleted Successfully");

      fetchNotifications();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    const value = search.toLowerCase();

    return (
      String(notification.user_id).includes(value) ||
      notification.message.toLowerCase().includes(value)
    );
  });

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <div>
          <h1>Notifications</h1>

          <p
            style={{
              color: "#64748b",
            }}
          >
            Manage company notifications
          </p>
        </div>

        <AddNotification
          fetchNotifications={fetchNotifications}
        />
      </div>

      <input
        type="text"
        placeholder="Search Notification..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "350px",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          marginBottom: "20px",
        }}
      />

      <EditNotification
        selectedNotification={selectedNotification}
        fetchNotifications={fetchNotifications}
        onClose={() => setSelectedNotification(null)}
      />

      <div
        style={{
          background: "white",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 5px 15px rgba(0,0,0,.08)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead
            style={{
              background: "#1e293b",
              color: "white",
            }}
          >
            <tr>
              <th style={{ padding: "15px" }}>ID</th>
              <th>User ID</th>
              <th>Message</th>
              <th>Sent At</th>
              <th>Read</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredNotifications.map((notification) => (
              <tr
                key={notification.id}
                style={{
                  borderBottom: "1px solid #eee",
                }}
              >
                <td style={{ padding: "15px" }}>
                  {notification.id}
                </td>

                <td>{notification.user_id}</td>

                <td>{notification.message}</td>

                <td>{notification.sent_at}</td>

                <td>
                  {notification.is_read ? "Yes" : "No"}
                </td>

                <td>
                  <button
                    onClick={() =>
                      setSelectedNotification(notification)
                    }
                    style={{
                      marginRight: "10px",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(notification.id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredNotifications.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "30px",
                  }}
                >
                  No Notifications Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Notifications;