import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

function TenantLogin() {
  const [companySlug, setCompanySlug] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post("/tenant-auth/login", {
        company_slug: companySlug,
        email: email,
        password: password,
      });

      localStorage.setItem(
        "access_token",
        response.data.access_token
      );

      localStorage.setItem(
        "tenant",
        companySlug
      );

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Invalid Company / Email / Password");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "350px",
          padding: "25px",
          border: "1px solid #ccc",
          borderRadius: "10px",
        }}
      >
        <h2>Tenant Login</h2>

        <input
          type="text"
          placeholder="Company Slug"
          value={companySlug}
          onChange={(e) => setCompanySlug(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px",
          }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "20px",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default TenantLogin;