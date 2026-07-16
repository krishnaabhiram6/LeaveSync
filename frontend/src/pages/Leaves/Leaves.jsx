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
      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            fontSize: "38px",
            color: "#0f172a",
            fontWeight: "700",
            marginBottom: "10px",
          }}
        >
          Leaves
        </h1>

        <p
          style={{
            color: "#64748b",
            fontSize: "16px",
          }}
        >
          Manage employee leave requests
        </p>
      </div>

      <input
        type="text"
        placeholder="Search Leave..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "350px",
          padding: "12px 16px",
          borderRadius: "10px",
          border: "1px solid #cbd5e1",
          outline: "none",
          fontSize: "15px",
          marginBottom: "20px",
        }}
      />

      <div
        style={{
          background: "white",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 5px 15px rgba(0,0,0,.08)",
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
              background: "#1e293b",
              color: "white",
            }}
          >
            <tr>
              <th style={{ padding: "15px" }}>ID</th>
              <th>Employee</th>
              <th>Leave Type</th>
              <th>Start</th>
              <th>End</th>
              <th>Status</th>
              <th>Reason</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredLeaves.map((leave) => (
              <tr
                key={leave.id}
                style={{
                  borderBottom: "1px solid #eee",
                }}
              >
                <td style={{ padding: "15px" }}>{leave.id}</td>

                <td>{leave.employee_id}</td>

                <td>{leave.leave_type_id}</td>

                <td>{leave.start_date}</td>

                <td>{leave.end_date}</td>

                <td>
                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: "20px",
                      color: "white",
                      fontWeight: "bold",
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
                          marginRight: "8px",
                          background: "#16a34a",
                          color: "white",
                          border: "none",
                          padding: "8px 14px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: "bold",
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
                          padding: "8px 14px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span
                      style={{
                        color: "#64748b",
                        fontWeight: "bold",
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
                    padding: "30px",
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