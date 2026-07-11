import { useState } from "react";
import { createNotification } from "../../services/notificationService";

function AddNotification({ fetchNotifications }) {
  const [form, setForm] = useState({
    user_id: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await createNotification(form);

      alert("Notification Added Successfully");

      fetchNotifications();

      setForm({
        user_id: "",
        message: "",
      });
    } catch (err) {
      console.log(err);
      alert("Failed");
    }
  };

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>Add Notification</h2>

      <input
        name="user_id"
        placeholder="User ID"
        value={form.user_id}
        onChange={handleChange}
      />

      <input
        name="message"
        placeholder="Message"
        value={form.message}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>
        Add Notification
      </button>
    </div>
  );
}

export default AddNotification;