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

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <div>
          <h1>Employees</h1>

          <p
            style={{
              color: "#64748b",
            }}
          >
            Manage company employees
          </p>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search Employee..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
          width: "350px",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          marginBottom: "20px",
        }}
      />

      <EditEmployee
        selectedEmployee={selectedEmployee}
        fetchEmployees={fetchEmployees}
        onClose={() =>
          setSelectedEmployee(null)
        }
      />

      <div
        style={{
          background: "white",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow:
            "0 5px 15px rgba(0,0,0,.08)",
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
              <th>Code</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((emp) => (
              <tr
                key={emp.id}
                style={{
                  borderBottom:
                    "1px solid #eee",
                }}
              >
                <td style={{ padding: "15px" }}>
                  {emp.id}
                </td>

                <td>{emp.employee_code}</td>

                <td>{emp.user.name}</td>

                <td>{emp.user.email}</td>

                <td>{emp.department}</td>

                <td>{emp.designation}</td>

                <td>
                  <button
                    onClick={() =>
                      setSelectedEmployee(emp)
                    }
                    style={{
                      marginRight: "10px",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(emp)
                    }
                    disabled={
                      deletingId === emp.id
                    }
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
                    padding: "30px",
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