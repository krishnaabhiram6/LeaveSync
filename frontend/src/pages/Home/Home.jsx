import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#0f172a",
      }}
    >
      <div
        style={{
          width: "450px",
          padding: "40px",
          border: "1px solid #475569",
          borderRadius: "12px",
          backgroundColor: "#1e293b",
          textAlign: "center",
          boxShadow: "0 0 20px rgba(0,0,0,0.3)",
        }}
      >
        <h1
          style={{
            color: "white",
            marginBottom: "10px",
          }}
        >
          LeaveSync
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            marginBottom: "40px",
          }}
        >
          Multi-Tenant Leave Management System
        </p>

        <button
          onClick={() => navigate("/login")}
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "20px",
            fontSize: "17px",
            cursor: "pointer",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#2563eb",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Super Admin Login
        </button>

        <button
          onClick={() => navigate("/tenant-login")}
          style={{
            width: "100%",
            padding: "14px",
            fontSize: "17px",
            cursor: "pointer",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#16a34a",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Tenant Login
        </button>
      </div>
    </div>
  );
}

export default Home;