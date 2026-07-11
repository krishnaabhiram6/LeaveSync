import { useEffect, useState } from "react";
import { updateEmployee } from "../../services/employeeService";

function EditEmployee({
  selectedEmployee,
  fetchEmployees,
  onClose,
}) {

  const [form, setForm] = useState({
    user_id: "",
    employee_code: "",
    department: "",
    designation: "",
  });

  useEffect(() => {
    if (selectedEmployee) {
      setForm({
        user_id: selectedEmployee.user_id,
        employee_code: selectedEmployee.employee_code,
        department: selectedEmployee.department,
        designation: selectedEmployee.designation,
      });
    }
  }, [selectedEmployee]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {

      await updateEmployee(
        selectedEmployee.id,
        {
          ...form,
          user_id: Number(form.user_id),
        }
      );

      alert("Employee Updated");

      fetchEmployees();

      onClose();

    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  if (!selectedEmployee) return null;

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <h2>Edit Employee</h2>

      <input
        name="user_id"
        placeholder="User ID"
        value={form.user_id}
        onChange={handleChange}
      />

      <input
        name="employee_code"
        placeholder="Employee Code"
        value={form.employee_code}
        onChange={handleChange}
      />

      <input
        name="department"
        placeholder="Department"
        value={form.department}
        onChange={handleChange}
      />

      <input
        name="designation"
        placeholder="Designation"
        value={form.designation}
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={handleUpdate}>
        Update Employee
      </button>

      <button
        onClick={onClose}
        style={{ marginLeft: "10px" }}
      >
        Cancel
      </button>

    </div>
  );
}

export default EditEmployee;