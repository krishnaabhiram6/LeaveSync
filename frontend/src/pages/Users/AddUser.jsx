import { useState } from "react";
import { createUser } from "../../services/userService";

function AddUser({ fetchUsers }) {
  const [form, setForm] = useState({
    keycloak_id: "",
    name: "",
    email: "",
    password: "",
    role: "Employee",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await createUser(form);

      alert("User Added Successfully");

      fetchUsers();

      setForm({
        keycloak_id: "",
        name: "",
        email: "",
        password: "",
        role: "Employee",
      });

    } catch (err) {
      console.log(err);
      alert("Failed to add user");
    }
  };

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>Add User</h2>

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
        <option>Employee</option>
        <option>Manager</option>
      </select>

      <button onClick={handleSubmit}>
        Add User
      </button>
    </div>
  );
}

export default AddUser;