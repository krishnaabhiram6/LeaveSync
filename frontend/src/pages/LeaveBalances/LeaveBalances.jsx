import { useEffect, useState } from "react";
import {
  getLeaveBalances,
  deleteLeaveBalance,
} from "../../services/leaveBalanceService";

import AddLeaveBalance from "./AddLeaveBalance";
import EditLeaveBalance from "./EditLeaveBalance";

function LeaveBalances() {
  const [leaveBalances, setLeaveBalances] = useState([]);
  const [selectedLeaveBalance, setSelectedLeaveBalance] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchLeaveBalances();
  }, []);

  const fetchLeaveBalances = async () => {
    try {
      const data = await getLeaveBalances();
      setLeaveBalances(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Leave Balance?")) return;

    try {
      await deleteLeaveBalance(id);

      alert("Leave Balance Deleted Successfully");

      fetchLeaveBalances();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  const filteredLeaveBalances = leaveBalances.filter((balance) => {
    const value = search.toLowerCase();

    return (
      balance.employee_name.toLowerCase().includes(value) ||
      balance.leave_type_name.toLowerCase().includes(value)
    );
  });

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
            Leave Balances
          </h1>

          <p
            style={{
              marginTop: "8px",
              color: "#64748b",
              fontSize: "15px",
            }}
          >
            Manage employee leave balances
          </p>
        </div>

        <AddLeaveBalance
          fetchLeaveBalances={fetchLeaveBalances}
        />
      </div>

      {/* Search */}

      <input
        type="text"
        placeholder="Search Employee or Leave Type..."
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

      <EditLeaveBalance
        selectedLeaveBalance={selectedLeaveBalance}
        fetchLeaveBalances={fetchLeaveBalances}
        onClose={() => setSelectedLeaveBalance(null)}
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
                Total Days
              </th>
              <th style={{ padding: "18px", fontWeight: "600" }}>
                Used Days
              </th>
              <th style={{ padding: "18px", fontWeight: "600" }}>
                Remaining Days
              </th>
              <th
                style={{
                  padding: "18px",
                  fontWeight: "600",
                  width: "180px",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredLeaveBalances.map((balance) => (
              <tr
                key={balance.id}
                style={{
                  borderBottom: "1px solid #e2e8f0",
                  height: "60px",
                }}
              >
                <td style={{ padding: "18px" }}>
                  {balance.id}
                </td>

                <td>{balance.employee_name}</td>

                <td>{balance.leave_type_name}</td>

                <td>{balance.total_days}</td>

                <td>{balance.used_days}</td>

                <td>{balance.remaining_days}</td>

                <td>
                  <button
                    onClick={() =>
                      setSelectedLeaveBalance(balance)
                    }
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
                    onClick={() =>
                      handleDelete(balance.id)
                    }
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

            {filteredLeaveBalances.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  style={{
                    textAlign: "center",
                    padding: "35px",
                    color: "#64748b",
                  }}
                >
                  No Leave Balances Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaveBalances;