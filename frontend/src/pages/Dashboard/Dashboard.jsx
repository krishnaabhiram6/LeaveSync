import AdminDashboard from "../AdminDashboard/AdminDashboard";
import EmployeeDashboard from "../EmployeeDashboard/EmployeeDashboard";
import ManagementDashboard from "../ManagementDashboard/ManagementDashboard";
import SuperAdminDashboard from "../SuperAdminDashboard/SuperAdminDashboard";

import { getRole } from "../../utils/auth";

function Dashboard() {
  const role = getRole();

  switch (role) {
    case "SuperAdmin":
      return <SuperAdminDashboard />;

    case "Admin":
      return <AdminDashboard />;

    case "Manager":
    case "HR":
      return <ManagementDashboard />;

    case "Employee":
      return <EmployeeDashboard />;

    default:
      return <h2>Access Denied</h2>;
  }
}

export default Dashboard;