import { useEffect, useState } from "react";

import { createLeaveBalance } from "../../services/leaveBalanceService";
import { getEmployees } from "../../services/employeeService";
import { getLeaveTypes } from "../../services/leaveTypeService";

function AddLeaveBalance({ fetchLeaveBalances }) {
  const [employees, setEmployees] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);

  const [form, setForm] = useState({
    employee_id: "",
    leave_type_id: "",
    total_days: "",
  });

  useEffect(() => {
    fetchEmployees();
    fetchLeaveTypes();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
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
      await createLeaveBalance({
        employee_id: Number(form.employee_id),
        leave_type_id: Number(form.leave_type_id),
        total_days: Number(form.total_days),
      });

      alert("Leave Balance Added Successfully");

      fetchLeaveBalances();

      setForm({
        employee_id: "",
        leave_type_id: "",
        total_days: "",
      });
    } catch (error) {
      console.log(error);
      alert("Failed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <select
        name="employee_id"
        value={form.employee_id}
        onChange={handleChange}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #d1d5db",
          minWidth: "180px",
        }}
      >
        <option value="">Select Employee</option>

        {employees.map((employee) => (
          <option
            key={employee.id}
            value={employee.id}
          >
            {employee.user.name}
          </option>
        ))}
      </select>

      <select
        name="leave_type_id"
        value={form.leave_type_id}
        onChange={handleChange}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #d1d5db",
          minWidth: "180px",
        }}
      >
        <option value="">Select Leave Type</option>

        {leaveTypes.map((leaveType) => (
          <option
            key={leaveType.id}
            value={leaveType.id}
          >
            {leaveType.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="total_days"
        placeholder="Total Days"
        value={form.total_days}
        onChange={handleChange}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #d1d5db",
          width: "140px",
        }}
      />

      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        Add Balance
      </button>
    </div>
  );
}

export default AddLeaveBalance;