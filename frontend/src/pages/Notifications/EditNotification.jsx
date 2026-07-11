import { useEffect, useState } from "react";
import { updateNotification } from "../../services/notificationService";

function EditNotification({
  selectedNotification,
  fetchNotifications,
  onClose,
}) {
  const [form, setForm] = useState({
    user_id: "",
    message: "",
  });

  useEffect(() => {
    if (selectedNotification) {
      setForm({
        user_id: selectedNotification.user_id,
        message: selectedNotification.message,
      });
    }
  }, [selectedNotification]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await updateNotification(
        selectedNotification.id,
        form
      );

      alert("Updated Successfully");

      fetchNotifications();

      onClose();
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  if (!selectedNotification) return null;

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <h2>Edit Notification</h2>

      <input
        name="user_id"
        value={form.user_id}
        onChange={handleChange}
      />

      <input
        name="message"
        value={form.message}
        onChange={handleChange}
      />

      <br />
      <br />

      <button onClick={handleUpdate}>
        Update
      </button>

      <button
        onClick={onClose}
        style={{ marginLeft: "10px" }}
      >
        Cancel
      </button>
    </div>
  );
}

export default EditNotification;