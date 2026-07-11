import { useEffect, useState } from "react";
import {
  getEmployees,
  deleteEmployee,
} from "../../services/employeeService";

import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

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

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Employee?")) return;

    await deleteEmployee(id);

    fetchEmployees();
  };

  return (
    <div>
      <h1>Employees</h1>

      <EditEmployee
        selectedEmployee={selectedEmployee}
        fetchEmployees={fetchEmployees}
        onClose={() => setSelectedEmployee(null)}
      />

      <AddEmployee fetchEmployees={fetchEmployees} />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Employee Code</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.user_id}</td>
              <td>{emp.employee_code}</td>
              <td>{emp.department}</td>
              <td>{emp.designation}</td>

              <td>
                <button
                  onClick={() => setSelectedEmployee(emp)}
                >
                  Edit
                </button>

                <button
                  style={{ marginLeft: 10 }}
                  onClick={() => handleDelete(emp.id)}
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default Employees;