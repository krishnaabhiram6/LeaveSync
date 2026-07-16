import { useNavigate } from "react-router-dom";

function EmployeeDashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Apply Leave",
      description: "Create a leave request",
      path: "/leaves",
    },
    {
      title: "My Leaves",
      description: "View previous leave requests",
      path: "/leaves",
    },
    {
      title: "Leave Balance",
      description: "Check remaining leave balance",
      path: "/leaves",
    },
    {
      title: "Notifications",
      description: "View notifications",
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
        Employee Dashboard
      </h1>

      <p
        style={{
          color: "#64748b",
          marginBottom: "35px",
        }}
      >
        Welcome back.
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
              boxShadow: "0 10px 20px rgba(0,0,0,.08)",
            }}
          >
            <h2>{card.title}</h2>

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

export default EmployeeDashboard;