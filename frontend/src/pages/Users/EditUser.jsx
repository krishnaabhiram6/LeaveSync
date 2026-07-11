import { useEffect, useState } from "react";
import { updateUser } from "../../services/userService";

function EditUser({ selectedUser, fetchUsers, onClose }) {
  const [form, setForm] = useState({
    keycloak_id: "",
    name: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    if (selectedUser) {
      setForm({
        keycloak_id: selectedUser.keycloak_id || "",
        name: selectedUser.name || "",
        email: selectedUser.email || "",
        password: "",
        role: selectedUser.role || "",
      });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("access_token");

      await updateUser(selectedUser.id, form);

      alert("User Updated Successfully");

      fetchUsers();

      onClose();

    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  if (!selectedUser) return null;

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <h2>Edit User</h2>

      <input
        name="keycloak_id"
        placeholder="Keycloak ID"
        value={form.keycloak_id}
        onChange={handleChange}
      />

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />

      <select
        name="role"
        value={form.role}
        onChange={handleChange}
      >
        <option>Admin</option>
        <option>Manager</option>
        <option>Employee</option>
      </select>

      <br /><br />

      <button onClick={handleUpdate}>
        Update User
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

export default EditUser;