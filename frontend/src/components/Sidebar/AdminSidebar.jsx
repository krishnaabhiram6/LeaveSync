import { Link, useLocation } from "react-router-dom";
import { logout } from "../../utils/logout";

function AdminSidebar() {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const menus = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Users",
      path: "/users",
    },
    {
      name: "Employees",
      path: "/employees",
    },
    {
      name: "Leave Types",
      path: "/leave-types",
    },
    {
      name: "Leaves",
      path: "/leaves",
    },
    {
      name: "Notifications",
      path: "/notifications",
    },
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
      {/* Logo */}

      <div
        style={{
          padding: "25px",
          borderBottom: "1px solid #334155",
        }}
      >
        <h2
          style={{
            margin: 0,
          }}
        >
          LeaveSync
        </h2>

        <p
          style={{
            marginTop: "20px",
            fontSize: "15px",
            color: "#cbd5e1",
          }}
        >
          {user.name || "Administrator"}
        </p>

        <small
          style={{
            color: "#94a3b8",
          }}
        >
          Admin
        </small>
      </div>

      {/* Menu */}

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
              transition: ".2s",
              background:
                location.pathname === menu.path
                  ? "#2563eb"
                  : "transparent",
              color: "white",
            }}
          >
            {menu.name}
          </Link>
        ))}
      </div>

      {/* Logout */}

      <div
        style={{
          padding: "20px",
          borderTop: "1px solid #334155",
        }}
      >
        <button
          onClick={logout}
          style={{
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: "10px",
            background: "#dc2626",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;