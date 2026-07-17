import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { getRole } from "../../utils/auth";

function SuperAdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const response = await api.post("/auth/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      localStorage.setItem("access_token", response.data.access_token);
      const role = getRole();
      localStorage.setItem("role", role);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: "Platform Owner",
          email,
          role,
        })
      );

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Invalid Email or Password");
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
            👑
          </div>
          <h1 style={{ color: "#fff", margin: 0, fontSize: "34px" }}>Super Admin</h1>
          <p style={{ color: "#cbd5e1", marginTop: "10px" }}>
            Login to manage all tenants and platform settings.
          </p>
        </div>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
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
          Secure Super Administrator Portal
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

export default SuperAdminLogin;