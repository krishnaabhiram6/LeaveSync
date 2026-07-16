import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { getRole } from "../../utils/auth";

function SuperAdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const formData = new URLSearchParams();

      formData.append("username", email);
      formData.append("password", password);

      const response = await api.post(
        "/auth/login",
        formData,
        {
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
        }
      );

      localStorage.setItem(
        "access_token",
        response.data.access_token
      );

      const role = getRole();

      localStorage.setItem("role", role);

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: "Platform Owner",
          email: email,
          role: role,
        })
      );

      console.log(role);

      navigate("/dashboard");

    } catch (error) {
      console.log(error);

      alert("Invalid Email or Password");
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
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 5px 20px rgba(0,0,0,.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#1e293b",
          }}
        >
          Super Admin Login
        </h2>

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
            marginTop: "20px",
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
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default SuperAdminLogin;