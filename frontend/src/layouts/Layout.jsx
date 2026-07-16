import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/Sidebar/AdminSidebar";
import EmployeeSidebar from "../components/Sidebar/EmployeeSidebar";
import ManagementSidebar from "../components/Sidebar/ManagementSidebar";
import SuperAdminSidebar from "../components/Sidebar/SuperAdminSidebar";

import { getRole } from "../utils/auth";

function Layout() {
  const role = getRole();

  const renderSidebar = () => {
    switch (role) {
      case "SuperAdmin":
        return <SuperAdminSidebar />;

      case "Admin":
        return <AdminSidebar />;

      case "Manager":
      case "HR":
        return <ManagementSidebar />;

      case "Employee":
        return <EmployeeSidebar />;

      default:
        return <AdminSidebar />;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f8fafc",
      }}
    >
      {renderSidebar()}

      <div
        style={{
          flex: 1,
          padding: "30px",
          overflowY: "auto",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;