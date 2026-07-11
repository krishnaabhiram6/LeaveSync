import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          background: "#1e293b",
          color: "white",
          padding: "20px",
        }}
      >
        <h2>LeaveSync</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/users">Users</Link>
          <Link to="/employees">Employees</Link>
          <Link to="/leave-types">Leave Types</Link>
          <Link to="/leaves">Leaves</Link>
          <Link to="/notifications">Notifications</Link>
          <Link to="/tenants">Tenants</Link>
        </nav>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;