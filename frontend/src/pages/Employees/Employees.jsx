import { useEffect, useState } from "react";
import {
  getEmployees,
  deleteEmployee,
} from "../../services/employeeService";

import EditEmployee from "./EditEmployee";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (emp) => {
    if (
      !window.confirm(
        `Delete employee "${emp.user.name}" (${emp.employee_code})?`
      )
    ) {
      return;
    }

    setDeletingId(emp.id);

    try {
      await deleteEmployee(emp.id);

      alert("Employee Deleted Successfully");

      await fetchEmployees();
    } catch (error) {
      console.log(error.response?.data);

      alert(
        error.response?.data?.detail ||
          "Delete Failed"
      );
    } finally {
      setDeletingId(null);
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const value = search.toLowerCase();

    return (
      emp.user.name.toLowerCase().includes(value) ||
      emp.user.email.toLowerCase().includes(value) ||
      emp.employee_code.toLowerCase().includes(value) ||
      emp.department.toLowerCase().includes(value) ||
      emp.designation.toLowerCase().includes(value)
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
            Employees
          </h1>

          <p
            style={{
              marginTop: "8px",
              color: "#64748b",
              fontSize: "15px",
            }}
          >
            Manage company employees
          </p>
        </div>
      </div>

      {/* Search */}

      <input
        type="text"
        placeholder="Search Employee..."
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

      <EditEmployee
        selectedEmployee={selectedEmployee}
        fetchEmployees={fetchEmployees}
        onClose={() => setSelectedEmployee(null)}
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
              <th style={{ padding: "18px", fontWeight: "600" }}>Code</th>
              <th style={{ padding: "18px", fontWeight: "600" }}>Name</th>
              <th style={{ padding: "18px", fontWeight: "600" }}>Email</th>
              <th style={{ padding: "18px", fontWeight: "600" }}>Department</th>
              <th style={{ padding: "18px", fontWeight: "600" }}>Designation</th>
              <th style={{ padding: "18px", fontWeight: "600" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((emp) => (
              <tr
                key={emp.id}
                style={{
                  borderBottom: "1px solid #e2e8f0",
                  height: "60px",
                }}
              >
                <td style={{ padding: "18px" }}>{emp.id}</td>

                <td>{emp.employee_code}</td>

                <td>{emp.user.name}</td>

                <td>{emp.user.email}</td>

                <td>{emp.department}</td>

                <td>{emp.designation}</td>

                <td>
                  <button
                    onClick={() => setSelectedEmployee(emp)}
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
                    onClick={() => handleDelete(emp)}
                    disabled={deletingId === emp.id}
                    style={{
                      background: "#dc2626",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "8px 14px",
                      cursor: deletingId === emp.id ? "not-allowed" : "pointer",
                      opacity: deletingId === emp.id ? 0.7 : 1,
                    }}
                  >
                    {deletingId === emp.id
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </td>
              </tr>
            ))}

            {filteredEmployees.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  style={{
                    textAlign: "center",
                    padding: "35px",
                    color: "#64748b",
                  }}
                >
                  No Employees Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employees;