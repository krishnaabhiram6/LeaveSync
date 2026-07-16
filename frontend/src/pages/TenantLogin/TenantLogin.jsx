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
        email,
        password,
      });

      // Save Access Token
      localStorage.setItem(
        "access_token",
        response.data.access_token
      );

      // Save Tenant
      localStorage.setItem(
        "tenant",
        companySlug
      );

      // Save Logged In User
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      // Save Role
      localStorage.setItem(
        "role",
        response.data.user.role
      );

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
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f1f5f9",
      }}
    >
      <div
        style={{
          width: "380px",
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 0 20px rgba(0,0,0,.1)",
        }}
      >
        <h2
  style={{
    textAlign: "center",
    color: "#1e293b",
    marginBottom: "25px",
    fontWeight: "700",
  }}
>
  Company Login
</h2>

        <input
          type="text"
          placeholder="Company Slug"
          value={companySlug}
          onChange={(e) =>
            setCompanySlug(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
          }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "25px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default TenantLogin;