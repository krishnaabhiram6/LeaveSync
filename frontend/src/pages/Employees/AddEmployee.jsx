import { useState } from "react";
import { createEmployee } from "../../services/employeeService";

function AddEmployee({ fetchEmployees }) {
  const [form, setForm] = useState({
    user_id: "",
    employee_code: "",
    department: "",
    designation: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await createEmployee({
        ...form,
        user_id: Number(form.user_id),
      });

      alert("Employee Added Successfully");

      fetchEmployees();

      setForm({
        user_id: "",
        employee_code: "",
        department: "",
        designation: "",
      });

    } catch (error) {
      console.log(error);
      alert("Failed to Add Employee");
    }
  };

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>Add Employee</h2>

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

      <button onClick={handleSubmit}>
        Add Employee
      </button>
    </div>
  );
}

export default AddEmployee;