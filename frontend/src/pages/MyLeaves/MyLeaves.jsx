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

      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            fontSize: "40px",
            color: "#1e293b",
            marginBottom: "10px",
            fontWeight: "700",
          }}
        >
          My Leaves
        </h1>

        <p
          style={{
            color: "#64748b",
            fontSize: "16px",
          }}
        >
          Apply and track your leave requests
        </p>
      </div>

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          marginBottom: "30px",
          boxShadow: "0 5px 15px rgba(0,0,0,.08)",
        }}
      >
        <h2
          style={{
            color: "#1e293b",
            marginBottom: "25px",
          }}
        >
          Apply Leave
        </h2>

        <select
          name="leave_type_id"
          value={form.leave_type_id}
          onChange={handleChange}
          style={{
            width: "300px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">
            Select Leave Type
          </option>

          {leaveTypes.map((type) => (
            <option
              key={type.id}
              value={type.id}
            >
              {type.name}
            </option>
          ))}
        </select>

        <br /><br />

        <input
          type="date"
          name="start_date"
          value={form.start_date}
          onChange={handleChange}
          style={{
            width: "300px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <br /><br />

        <input
          type="date"
          name="end_date"
          value={form.end_date}
          onChange={handleChange}
          style={{
            width: "300px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <br /><br />

        <textarea
          rows="4"
          name="reason"
          placeholder="Reason"
          value={form.reason}
          onChange={handleChange}
          style={{
            width: "500px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <br /><br />

        <button
          onClick={handleSubmit}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 25px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          Apply Leave
        </button>
      </div>

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
              <th style={{ padding: "15px" }}>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {leaves.map((leave) => (
              <tr
                key={leave.id}
                style={{
                  borderBottom: "1px solid #eee",
                }}
              >
                <td style={{ padding: "15px" }}>
                  {leave.leave_type_id}
                </td>

                <td>{leave.start_date}</td>

                <td>{leave.end_date}</td>

                <td>{leave.reason}</td>

                <td>
                  {leave.status === "Approved" && (
                    <span style={{ color: "green", fontWeight: "bold" }}>
                      Approved
                    </span>
                  )}

                  {leave.status === "Rejected" && (
                    <span style={{ color: "red", fontWeight: "bold" }}>
                      Rejected
                    </span>
                  )}

                  {leave.status === "Pending" && (
                    <span style={{ color: "#f59e0b", fontWeight: "bold" }}>
                      Pending
                    </span>
                  )}
                </td>
              </tr>
            ))}

            {leaves.length === 0 && (
              <tr>
                <td
                  colSpan="5"
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

export default MyLeaves;