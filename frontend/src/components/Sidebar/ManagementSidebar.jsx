import { Link, useLocation } from "react-router-dom";
import { logout } from "../../utils/logout";

function ManagementSidebar() {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const menus = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Employees", path: "/employees" },
    { name: "Leaves", path: "/leaves" },
    { name: "Notifications", path: "/notifications" },
  ];

  return (
    <div
      style={{
        width: "260px",
        background: "#0f172a",
        color: "white",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <div
        style={{
          padding: "25px",
          borderBottom: "1px solid #334155",
        }}
      >
        <h2>LeaveSync</h2>

        <p style={{ marginTop: 20 }}>
          {user.name || "Manager"}
        </p>

        <small>Manager / HR</small>
      </div>

      <div
        style={{
          flex: 1,
          padding: "20px",
        }}
      >
        {menus.map((menu) => (
          <Link
            key={menu.path}
            to={menu.path}
            style={{
              display: "block",
              padding: "14px",
              marginBottom: "10px",
              borderRadius: "10px",
              textDecoration: "none",
              color: "white",
              background:
                location.pathname === menu.path
                  ? "#2563eb"
                  : "transparent",
            }}
          >
            {menu.name}
          </Link>
        ))}
      </div>

      <div
        style={{
          padding: "20px",
        }}
      >
        <button
          onClick={logout}
          style={{
            width: "100%",
            padding: "12px",
            border: "none",
            background: "#dc2626",
            color: "white",
            borderRadius: "10px",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ManagementSidebar;