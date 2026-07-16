import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../services/userService";

import AddUser from "./AddUser";
import EditUser from "./EditUser";

function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(id);
      alert("User Deleted Successfully");
      fetchUsers();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>

      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <div>
          <h1 style={{ marginBottom: "5px" }}>
            Users
          </h1>

          <p style={{ color: "#64748b" }}>
            Manage all company users
          </p>
        </div>

        <AddUser fetchUsers={fetchUsers} />
      </div>

      {/* Search */}

      <input
        placeholder="Search user..."
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

      {/* Edit */}

      <EditUser
        selectedUser={selectedUser}
        fetchUsers={fetchUsers}
        onClose={() => setSelectedUser(null)}
      />

      {/* Table */}

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
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                style={{
                  borderBottom: "1px solid #eee",
                }}
              >
                <td style={{ padding: "15px" }}>
                  {user.id}
                </td>

                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>{user.role}</td>

                <td>
                  <button
                    onClick={() => handleEdit(user)}
                    style={{
                      marginRight: "10px",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    textAlign: "center",
                    padding: "30px",
                  }}
                >
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Users;