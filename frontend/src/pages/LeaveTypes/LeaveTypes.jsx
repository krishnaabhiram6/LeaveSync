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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <div>
          <h1>Leave Types</h1>

          <p
            style={{
              color: "#64748b",
            }}
          >
            Configure leave policies
          </p>
        </div>

        <AddLeaveType fetchLeaveTypes={fetchLeaveTypes} />
      </div>

      <input
        type="text"
        placeholder="Search Leave Type..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "350px",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          marginBottom: "20px",
        }}
      />

      <EditLeaveType
        selectedLeaveType={selectedLeaveType}
        fetchLeaveTypes={fetchLeaveTypes}
        onClose={() => setSelectedLeaveType(null)}
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
              <th>Name</th>
              <th>Max Days / Year</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredLeaveTypes.map((leaveType) => (
              <tr
                key={leaveType.id}
                style={{
                  borderBottom: "1px solid #eee",
                }}
              >
                <td style={{ padding: "15px" }}>
                  {leaveType.id}
                </td>

                <td>{leaveType.name}</td>

                <td>{leaveType.max_days_per_year}</td>

                <td>
                  <button
                    onClick={() =>
                      setSelectedLeaveType(leaveType)
                    }
                    style={{
                      marginRight: "10px",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(leaveType.id)
                    }
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
                    padding: "30px",
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