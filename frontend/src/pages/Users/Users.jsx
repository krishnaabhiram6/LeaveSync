import { useEffect, useState } from "react";
import {
  getUsers,
  deleteUser,
} from "../../services/userService";
import AddUser from "./AddUser";
import EditUser from "./EditUser";

function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

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


  return (
    <div>
      <h1>Users</h1>

      <EditUser
  selectedUser={selectedUser}
  fetchUsers={fetchUsers}
  onClose={() => setSelectedUser(null)}
/>

      <AddUser fetchUsers={fetchUsers} />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleEdit(user)}>
  Edit
</button>
                <button
  onClick={() => handleDelete(user.id)}
  style={{ marginLeft: "10px" }}
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

export default Users;