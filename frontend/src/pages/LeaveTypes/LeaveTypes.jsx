import { useEffect, useState } from "react";
import {
  getLeaveTypes,
  deleteLeaveType,
} from "../../services/leaveTypeService";

import AddLeaveType from "./AddLeaveType";
import EditLeaveType from "./EditLeaveType";

function LeaveTypes() {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [selectedLeaveType, setSelectedLeaveType] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchLeaveTypes();
  }, []);

  const fetchLeaveTypes = async () => {
    try {
      const data = await getLeaveTypes();
      setLeaveTypes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Leave Type?")) return;

    try {
      await deleteLeaveType(id);

      alert("Leave Type Deleted Successfully");

      fetchLeaveTypes();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  const filteredLeaveTypes = leaveTypes.filter((leaveType) =>
    leaveType.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "35px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "34px",
              fontWeight: "700",
              color: "#0f172a",
            }}
          >
            Leave Types
          </h1>

          <p
            style={{
              marginTop: "8px",
              color: "#64748b",
              fontSize: "15px",
            }}
          >
            Configure leave policies
          </p>
        </div>

        <AddLeaveType fetchLeaveTypes={fetchLeaveTypes} />
      </div>

      {/* Search */}

      <input
        type="text"
        placeholder="Search Leave Type..."
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

      {/* Edit */}

      <EditLeaveType
        selectedLeaveType={selectedLeaveType}
        fetchLeaveTypes={fetchLeaveTypes}
        onClose={() => setSelectedLeaveType(null)}
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
              <th style={{ padding: "18px", fontWeight: "600" }}>Name</th>
              <th style={{ padding: "18px", fontWeight: "600" }}>
                Max Days / Year
              </th>
              <th style={{ padding: "18px", fontWeight: "600" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredLeaveTypes.map((leaveType) => (
              <tr
                key={leaveType.id}
                style={{
                  borderBottom: "1px solid #e2e8f0",
                  height: "60px",
                }}
              >
                <td style={{ padding: "18px" }}>{leaveType.id}</td>

                <td>{leaveType.name}</td>

                <td>{leaveType.max_days_per_year}</td>

                <td>
                  <button
                    onClick={() => setSelectedLeaveType(leaveType)}
                    style={{
                      background: "#2563eb",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "8px 14px",
                      marginRight: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(leaveType.id)}
                    style={{
                      background: "#dc2626",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "8px 14px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredLeaveTypes.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "center",
                    padding: "35px",
                    color: "#64748b",
                  }}
                >
                  No Leave Types Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaveTypes;