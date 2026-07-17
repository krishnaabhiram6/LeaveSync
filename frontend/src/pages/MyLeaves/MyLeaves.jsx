import { useEffect, useState } from "react";
import {
  getLeaves,
  createLeave,
} from "../../services/leaveService";

import { getLeaveTypes } from "../../services/leaveTypeService";

function MyLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);

  const [form, setForm] = useState({
    leave_type_id: "",
    start_date: "",
    end_date: "",
    reason: "",
  });

  useEffect(() => {
    fetchLeaves();
    fetchLeaveTypes();
  }, []);

  const fetchLeaves = async () => {
    try {
      const data = await getLeaves();
      setLeaves(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLeaveTypes = async () => {
    try {
      const data = await getLeaveTypes();
      setLeaveTypes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await createLeave({
        ...form,
        leave_type_id: Number(form.leave_type_id),
      });

      alert("Leave Applied Successfully");

      setForm({
        leave_type_id: "",
        start_date: "",
        end_date: "",
        reason: "",
      });

      fetchLeaves();
    } catch (error) {
      console.log(error);
      alert("Failed to Apply Leave");
    }
  };

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
          My Leaves
        </h1>

        <p
          style={{
            marginTop: "8px",
            color: "#64748b",
            fontSize: "15px",
          }}
        >
          Apply and track your leave requests
        </p>
      </div>

      {/* Apply Leave Card */}

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          marginBottom: "30px",
          boxShadow: "0 10px 30px rgba(15,23,42,.08)",
        }}
      >
        <h2
          style={{
            marginTop: 0,
            marginBottom: "25px",
            color: "#0f172a",
          }}
        >
          Apply Leave
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "500px",
          }}
        >
          <select
            name="leave_type_id"
            value={form.leave_type_id}
            onChange={handleChange}
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #cbd5e1",
              fontSize: "15px",
              outline: "none",
            }}
          >
            <option value="">Select Leave Type</option>

            {leaveTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #cbd5e1",
              fontSize: "15px",
              outline: "none",
            }}
          />

          <input
            type="date"
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #cbd5e1",
              fontSize: "15px",
              outline: "none",
            }}
          />

          <textarea
            rows="4"
            name="reason"
            placeholder="Reason"
            value={form.reason}
            onChange={handleChange}
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #cbd5e1",
              fontSize: "15px",
              outline: "none",
              resize: "vertical",
            }}
          />

          <button
            onClick={handleSubmit}
            style={{
              width: "170px",
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: "600",
            }}
          >
            Apply Leave
          </button>
        </div>
      </div>

      {/* Leave Table */}

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
                Reason
              </th>
              <th style={{ padding: "18px", fontWeight: "600" }}>
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {leaves.map((leave) => (
              <tr
                key={leave.id}
                style={{
                  borderBottom: "1px solid #e2e8f0",
                  height: "60px",
                }}
              >
                <td style={{ padding: "18px" }}>
                  {leave.leave_type_name || leave.leave_type_id}
                </td>

                <td>{leave.start_date}</td>

                <td>{leave.end_date}</td>

                <td>{leave.reason}</td>

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
              </tr>
            ))}

            {leaves.length === 0 && (
              <tr>
                <td
                  colSpan="5"
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

export default MyLeaves;