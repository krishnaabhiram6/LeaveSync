import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import TenantLogin from "./pages/TenantLogin/TenantLogin";

import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Users/Users";
import Employees from "./pages/Employees/Employees";
import LeaveTypes from "./pages/LeaveTypes/LeaveTypes";
import Leaves from "./pages/Leaves/Leaves";
import Notifications from "./pages/Notifications/Notifications";
import Tenants from "./pages/Tenants/Tenants";

import Layout from "./layouts/Layout";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/tenant-login"
        element={<TenantLogin />}
      />

      <Route element={<Layout />}>

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/users"
          element={<Users />}
        />

        <Route
          path="/employees"
          element={<Employees />}
        />

        <Route
          path="/leave-types"
          element={<LeaveTypes />}
        />

        <Route
          path="/leaves"
          element={<Leaves />}
        />

        <Route
          path="/notifications"
          element={<Notifications />}
        />

        <Route
          path="/tenants"
          element={<Tenants />}
        />

      </Route>

    </Routes>
  );
}

export default App;