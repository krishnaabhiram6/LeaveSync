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
      title: "Leaves",
      description: "View leave requests",
      path: "/leaves",
    },
    {
      title: "Notifications",
      description: "Manage notifications",
      path: "/notifications",
    },
  ];

  return (
    <div>
      <h1
        style={{
          fontSize: "32px",
          marginBottom: "10px",
        }}
      >
        Admin Dashboard
      </h1>

      <p
        style={{
          color: "#64748b",
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
          >
            <h2
              style={{
                marginBottom: "10px",
              }}
            >
              {card.title}
            </h2>

            <p
              style={{
                color: "#64748b",
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