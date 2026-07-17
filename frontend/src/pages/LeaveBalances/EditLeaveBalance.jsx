import { useEffect, useState } from "react";

import { updateLeaveBalance } from "../../services/leaveBalanceService";
import { getEmployees } from "../../services/employeeService";
import { getLeaveTypes } from "../../services/leaveTypeService";

function EditLeaveBalance({
  selectedLeaveBalance,
  fetchLeaveBalances,
  onClose,
}) {
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

  useEffect(() => {
    if (selectedLeaveBalance) {
      setForm({
        employee_id: selectedLeaveBalance.employee_id,
        leave_type_id: selectedLeaveBalance.leave_type_id,
        total_days: selectedLeaveBalance.total_days,
      });
    }
  }, [selectedLeaveBalance]);

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

  const handleUpdate = async () => {
    try {
      await updateLeaveBalance(
        selectedLeaveBalance.id,
        {
          employee_id: Number(form.employee_id),
          leave_type_id: Number(form.leave_type_id),
          total_days: Number(form.total_days),
        }
      );

      alert("Leave Balance Updated Successfully");

      fetchLeaveBalances();

      onClose();
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  if (!selectedLeaveBalance) return null;

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0,0,0,.08)",
        marginBottom: "20px",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>
        Edit Leave Balance
      </h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          alignItems: "center",
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
          onClick={handleUpdate}
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
          Update
        </button>

        <button
          onClick={onClose}
          style={{
            padding: "10px 20px",
            background: "#6b7280",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditLeaveBalance;