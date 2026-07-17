import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

function TenantLogin() {
  const [companySlug, setCompanySlug] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await api.post("/tenant-auth/login", {
        company_slug: companySlug,
        email,
        password,
      });

      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("tenant", companySlug);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("role", response.data.user.role);

      const role = response.data.user.role;

      console.log("USER =", response.data.user);
      console.log("ROLE =", role);

      switch (role) {
        case "Admin":
          navigate("/dashboard");
          break;
        case "Manager":
          navigate("/dashboard");
          break;
        case "HR":
          navigate("/dashboard");
          break;
        case "Employee":
          navigate("/dashboard");
          break;
        default:
          alert("Role not found");
      }
    } catch (err) {
      console.error(err);
      alert("Invalid Company / Email / Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg,#0f172a,#172554,#1e3a8a)",
        padding: "30px",
      }}
    >
      <div
        style={{
          width: "500px",
          background: "rgba(255,255,255,.08)",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,.15)",
          borderRadius: "24px",
          padding: "45px",
          boxShadow: "0 25px 60px rgba(0,0,0,.35)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "35px" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "linear-gradient(135deg,#2563eb,#3b82f6)",
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "34px",
              fontWeight: "700",
              margin: "0 auto 18px",
            }}
          >
            🏢
          </div>
          <h1 style={{ color: "#fff", margin: 0, fontSize: "34px" }}>Company Login</h1>
          <p style={{ color: "#cbd5e1", marginTop: "10px" }}>
            Login with your company credentials to continue.
          </p>
        </div>

        <input
          type="text"
          placeholder="Company Slug"
          value={companySlug}
          onChange={(e) => setCompanySlug(e.target.value)}
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ ...inputStyle, marginTop: "18px" }}
        />

        <div style={{ position: "relative", marginTop: "18px" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ ...inputStyle, marginTop: 0 }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "15px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              color: "#64748b",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "15px",
            marginTop: "28px",
            border: "none",
            borderRadius: "14px",
            background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "700",
            cursor: "pointer",
            transition: ".3s",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Signing In..." : "Login"}
        </button>

        <button
          onClick={() => navigate("/")}
          style={{
            width: "100%",
            padding: "14px",
            marginTop: "15px",
            borderRadius: "14px",
            border: "1px solid rgba(255,255,255,.25)",
            background: "rgba(255,255,255,.08)",
            color: "#fff",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          ← Back to Home
        </button>

        <div
          style={{
            marginTop: "35px",
            textAlign: "center",
            color: "#cbd5e1",
            fontSize: "14px",
            borderTop: "1px solid rgba(255,255,255,.12)",
            paddingTop: "20px",
          }}
        >
          LeaveSync SaaS Platform
          <br />
          Secure Company Login Portal
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "15px 18px",
  marginTop: "18px",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,.15)",
  background: "rgba(255,255,255,.12)",
  color: "#fff",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

export default TenantLogin;