import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#0f172a 0%,#172554 50%,#1e3a8a 100%)",
        padding: "30px",
      }}
    >
      <div
        style={{
          width: "560px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,.15)",
          borderRadius: "24px",
          padding: "55px 45px",
          textAlign: "center",
          boxShadow: "0 25px 60px rgba(0,0,0,.35)",
        }}
      >
        <div
          style={{
            width: "90px",
            height: "90px",
            margin: "0 auto 25px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg,#2563eb,#3b82f6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "40px",
            color: "#fff",
            fontWeight: "700",
            boxShadow: "0 12px 35px rgba(37,99,235,.45)",
          }}
        >
          L
        </div>

        <h1
          style={{
            color: "#ffffff",
            fontSize: "54px",
            margin: 0,
            fontWeight: "800",
            letterSpacing: "-1px",
          }}
        >
          LeaveSync
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            marginTop: "15px",
            marginBottom: "45px",
            fontSize: "18px",
            lineHeight: "1.7",
          }}
        >
          Enterprise Multi-Tenant Leave Management System
        </p>

        <button
          onClick={() => navigate("/login")}
          style={{
            width: "100%",
            padding: "18px",
            marginBottom: "18px",
            fontSize: "18px",
            cursor: "pointer",
            borderRadius: "14px",
            border: "none",
            background:
              "linear-gradient(135deg,#2563eb,#1d4ed8)",
            color: "#fff",
            fontWeight: "700",
            transition: ".25s",
            boxShadow: "0 10px 25px rgba(37,99,235,.35)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          👑 Super Admin Login
        </button>

        <button
          onClick={() => navigate("/tenant-login")}
          style={{
            width: "100%",
            padding: "18px",
            fontSize: "18px",
            cursor: "pointer",
            borderRadius: "14px",
            border: "none",
            background:
              "linear-gradient(135deg,#16a34a,#15803d)",
            color: "#fff",
            fontWeight: "700",
            transition: ".25s",
            boxShadow: "0 10px 25px rgba(22,163,74,.35)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          🏢 Tenant Login
        </button>

        <div
          style={{
            marginTop: "40px",
            color: "#94a3b8",
            fontSize: "14px",
          }}
        >
          Version 1.0 • Built with React + FastAPI
        </div>
      </div>
    </div>
  );
}

export default Home;