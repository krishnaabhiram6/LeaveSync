import { useEffect, useState } from "react";
import { getMyLeaveBalances } from "../../services/leaveBalanceService";

function MyLeaveBalance() {
  const [leaveBalances, setLeaveBalances] = useState([]);

  useEffect(() => {
    fetchLeaveBalances();
  }, []);

  const fetchLeaveBalances = async () => {
    try {
      const data = await getMyLeaveBalances();
      setLeaveBalances(data);
    } catch (err) {
      console.log(err);
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
          My Leave Balance
        </h1>

        <p
          style={{
            marginTop: "8px",
            color: "#64748b",
            fontSize: "15px",
          }}
        >
          View your available leave balances
        </p>
      </div>

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
              <th
                style={{
                  padding: "18px",
                  fontWeight: "600",
                }}
              >
                Leave Type
              </th>

              <th
                style={{
                  padding: "18px",
                  fontWeight: "600",
                }}
              >
                Total Days
              </th>

              <th
                style={{
                  padding: "18px",
                  fontWeight: "600",
                }}
              >
                Used Days
              </th>

              <th
                style={{
                  padding: "18px",
                  fontWeight: "600",
                }}
              >
                Remaining Days
              </th>
            </tr>
          </thead>

          <tbody>
            {leaveBalances.map((balance) => (
              <tr
                key={balance.id}
                style={{
                  borderBottom: "1px solid #e2e8f0",
                  height: "60px",
                }}
              >
                <td style={{ padding: "18px" }}>
                  {balance.leave_type_name}
                </td>

                <td>{balance.total_days}</td>

                <td>{balance.used_days}</td>

                <td>{balance.remaining_days}</td>
              </tr>
            ))}

            {leaveBalances.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "center",
                    padding: "35px",
                    color: "#64748b",
                  }}
                >
                  No Leave Balance Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyLeaveBalance;