import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/SuperAdminLogin/SuperAdminLogin";
import TenantLogin from "./pages/TenantLogin/TenantLogin";

import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Users/Users";
import Employees from "./pages/Employees/Employees";
import LeaveTypes from "./pages/LeaveTypes/LeaveTypes";
import Leaves from "./pages/Leaves/Leaves";
import Notifications from "./pages/Notifications/Notifications";
import Tenants from "./pages/Tenants/Tenants";

import Layout from "./layouts/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";

import MyLeaves from "./pages/MyLeaves/MyLeaves";

function App() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Super Admin Login */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* Company Login */}
      <Route
        path="/tenant-login"
        element={<TenantLogin />}
      />

      {/* Protected Routes */}
      <Route element={<Layout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              allowedRoles={[
                "SuperAdmin",
                "Admin",
                "Manager",
                "HR",
                "Employee",
              ]}
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute
              allowedRoles={["Admin"]}
            >
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Admin",
                "Manager",
                "HR",
              ]}
            >
              <Employees />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leave-types"
          element={
            <ProtectedRoute
              allowedRoles={["Admin"]}
            >
              <LeaveTypes />
            </ProtectedRoute>
          }
        />

       <Route
  path="/leaves"
  element={
    <ProtectedRoute
      allowedRoles={[
        "Admin",
        "Manager",
        "HR",
      ]}
    >
      <Leaves />
    </ProtectedRoute>
  }
/>

<Route
  path="/my-leaves"
  element={
    <ProtectedRoute
      allowedRoles={[
        "Employee",
      ]}
    >
      <MyLeaves />
    </ProtectedRoute>
  }
/>

        <Route
          path="/notifications"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Admin",
                "Manager",
                "HR",
                "Employee",
              ]}
            >
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tenants"
          element={
            <ProtectedRoute
              allowedRoles={["SuperAdmin"]}
            >
              <Tenants />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;