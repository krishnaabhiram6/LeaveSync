import { useNavigate } from "react-router-dom";

function SuperAdminDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h1
        style={{
          fontSize: "32px",
          marginBottom: "10px",
        }}
      >
        Super Admin Dashboard
      </h1>

      <p
        style={{
          color: "#64748b",
          marginBottom: "35px",
        }}
      >
        Manage all companies using LeaveSync.
      </p>

      <div
        onClick={() => navigate("/tenants")}
        style={{
          width: "320px",
          background: "#fff",
          padding: "30px",
          borderRadius: "14px",
          cursor: "pointer",
          boxShadow: "0 10px 20px rgba(0,0,0,.08)",
        }}
      >
        <h2>Tenants</h2>

        <p
          style={{
            color: "#64748b",
          }}
        >
          Create, edit, activate and deactivate companies.
        </p>
      </div>
    </div>
  );
}

export default SuperAdminDashboard;