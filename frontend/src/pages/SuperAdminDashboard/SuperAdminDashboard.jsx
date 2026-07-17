import { useNavigate } from "react-router-dom";

function SuperAdminDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h1
        style={{
          fontSize: "36px",
          fontWeight: "700",
          color: "#0f172a",
          marginBottom: "10px",
        }}
      >
        Super Admin Dashboard
      </h1>

      <p
        style={{
          color: "#64748b",
          fontSize: "16px",
          marginBottom: "35px",
        }}
      >
        Manage all companies using LeaveSync.
      </p>

      <div
        onClick={() => navigate("/tenants")}
        style={{
          width: "360px",
          background: "#ffffff",
          padding: "30px",
          borderRadius: "18px",
          cursor: "pointer",
          border: "1px solid #e2e8f0",
          boxShadow: "0 15px 35px rgba(15,23,42,0.12)",
          transition: "all .25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.boxShadow =
            "0 20px 45px rgba(15,23,42,.18)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 15px 35px rgba(15,23,42,.12)";
        }}
      >
        <h2
          style={{
            margin: "0 0 12px",
            color: "#0f172a",
            fontSize: "26px",
            fontWeight: "700",
          }}
        >
          Tenants
        </h2>

        <p
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: "16px",
            lineHeight: "1.6",
          }}
        >
          Create, edit, activate and deactivate companies.
        </p>
      </div>
    </div>
  );
}

export default SuperAdminDashboard;