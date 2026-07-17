import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Users",
      description: "Manage company users",
      path: "/users",
    },
    {
      title: "Employees",
      description: "Manage employees",
      path: "/employees",
    },
    {
      title: "Leave Types",
      description: "Configure leave policies",
      path: "/leave-types",
    },
    {
      title: "Leave Balances",
      description: "Manage employee leave balances",
      path: "/leave-balances",
    },
    {
      title: "Leaves",
      description: "View leave requests",
      path: "/leaves",
    },
  ];

  return (
    <div>
      <h1
        style={{
          fontSize: "34px",
          fontWeight: "700",
          color: "#0f172a",
          marginBottom: "10px",
        }}
      >
        Admin Dashboard
      </h1>

      <p
        style={{
          color: "#64748b",
          fontSize: "15px",
          marginBottom: "35px",
        }}
      >
        Welcome to your company administration panel.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: "25px",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.title}
            onClick={() => navigate(card.path)}
            style={{
              background: "#fff",
              borderRadius: "14px",
              padding: "25px",
              cursor: "pointer",
              transition: ".2s",
              boxShadow: "0 10px 20px rgba(0,0,0,.08)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow =
                "0 15px 30px rgba(0,0,0,.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 10px 20px rgba(0,0,0,.08)";
            }}
          >
            <h2
              style={{
                margin: "0 0 10px",
                color: "#0f172a",
                fontSize: "22px",
                fontWeight: "600",
              }}
            >
              {card.title}
            </h2>

            <p
              style={{
                margin: 0,
                color: "#64748b",
                fontSize: "16px",
                lineHeight: "1.5",
              }}
            >
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;