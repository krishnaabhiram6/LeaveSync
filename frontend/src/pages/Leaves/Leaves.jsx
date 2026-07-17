import { useEffect, useState } from "react";
import {
  getLeaves,
  approveLeave,
  rejectLeave,
} from "../../services/leaveService";

function Leaves() {
  const [leaves, setLeaves] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const data = await getLeaves();
      setLeaves(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveLeave(id);
      alert("Leave Approved");
      fetchLeaves();
    } catch (error) {
      console.log(error);
      alert("Approve Failed");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectLeave(id);
      alert("Leave Rejected");
      fetchLeaves();
    } catch (error) {
      console.log(error);
      alert("Reject Failed");
    }
  };

  const filteredLeaves = leaves.filter((leave) => {
    const value = search.toLowerCase();

    return (
      String(leave.employee_id).includes(value) ||
      String(leave.leave_type_id).includes(value) ||
      leave.status.toLowerCase().includes(value) ||
      leave.reason.toLowerCase().includes(value)
    );
  });

  return (
    <div>
      {/* Header */}

      <div
        style={{
          marginBottom: "35px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "34px",
            fontWeight: "700",
            color: "#0f172a",
          }}
        >
          Leaves
        </h1>

        <p
          style={{
            marginTop: "8px",
            color: "#64748b",
            fontSize: "15px",
          }}
        >
          Manage employee leave requests
        </p>
      </div>

      {/* Search */}

      <input
        type="text"
        placeholder="Search Leave..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "380px",
          padding: "13px 16px",
          borderRadius: "10px",
          border: "1px solid #cbd5e1",
          outline: "none",
          fontSize: "15px",
          marginBottom: "25px",
        }}
      />

      {/* Table */}

      <div
        style={{
          background: "white",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(15,23,42,.08)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead
            style={{
              background: "#0f172a",
              color: "white",
            }}
          >
            <tr>
              <th style={{ padding: "18px", fontWeight: "600" }}>ID</th>
              <th style={{ padding: "18px", fontWeight: "600" }}>
                Employee
              </th>
              <th style={{ padding: "18px", fontWeight: "600" }}>
                Leave Type
              </th>
              <th style={{ padding: "18px", fontWeight: "600" }}>
                Start Date
              </th>
              <th style={{ padding: "18px", fontWeight: "600" }}>
                End Date
              </th>
              <th style={{ padding: "18px", fontWeight: "600" }}>
                Status
              </th>
              <th style={{ padding: "18px", fontWeight: "600" }}>
                Reason
              </th>
              <th style={{ padding: "18px", fontWeight: "600" }}>
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredLeaves.map((leave) => (
              <tr
                key={leave.id}
                style={{
                  borderBottom: "1px solid #e2e8f0",
                  height: "60px",
                }}
              >
                <td style={{ padding: "18px" }}>{leave.id}</td>

                <td>{leave.employee_name}</td>

                <td>{leave.leave_type_name}</td>

                <td>{leave.start_date}</td>

                <td>{leave.end_date}</td>

                <td>
                  <span
                    style={{
                      display: "inline-block",
                      minWidth: "90px",
                      textAlign: "center",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      color: "white",
                      fontWeight: "600",
                      background:
                        leave.status === "Approved"
                          ? "#16a34a"
                          : leave.status === "Rejected"
                          ? "#dc2626"
                          : "#f59e0b",
                    }}
                  >
                    {leave.status}
                  </span>
                </td>

                <td>{leave.reason}</td>

                <td>
                  {leave.status === "Pending" ? (
                    <>
                      <button
                        onClick={() => handleApprove(leave.id)}
                        style={{
                          background: "#16a34a",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          padding: "8px 14px",
                          marginRight: "10px",
                          cursor: "pointer",
                        }}
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => handleReject(leave.id)}
                        style={{
                          background: "#dc2626",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          padding: "8px 14px",
                          cursor: "pointer",
                        }}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span
                      style={{
                        color: "#64748b",
                        fontWeight: "600",
                      }}
                    >
                      Completed
                    </span>
                  )}
                </td>
              </tr>
            ))}

            {filteredLeaves.length === 0 && (
              <tr>
                <td
                  colSpan="8"
                  style={{
                    textAlign: "center",
                    padding: "35px",
                    color: "#64748b",
                  }}
                >
                  No Leave Records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaves;