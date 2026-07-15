import { useEffect, useState } from "react";
import { updateEmployee } from "../../services/employeeService";

function EditEmployee({
  selectedEmployee,
  fetchEmployees,
  onClose,
}) {
  const [form, setForm] = useState({
    employee_code: "",
    department: "",
    designation: "",
  });

  useEffect(() => {
    if (selectedEmployee) {
      setForm({
        employee_code: selectedEmployee.employee_code,
        department: selectedEmployee.department || "",
        designation: selectedEmployee.designation || "",
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
      const payload = {
        user_id: selectedEmployee.user.id,
        employee_code: form.employee_code,
        department: form.department,
        designation: form.designation,
      };

      console.log("Payload:", payload);

      await updateEmployee(selectedEmployee.id, payload);

      alert("Employee Updated Successfully");

      fetchEmployees();

      onClose();

    } catch (error) {
      console.log(error.response?.data);
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

      <div style={{ marginBottom: "10px" }}>
        <label>Name</label>
        <br />
        <input
          value={selectedEmployee.user.name}
          readOnly
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Email</label>
        <br />
        <input
          value={selectedEmployee.user.email}
          readOnly
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Employee Code</label>
        <br />
        <input
          name="employee_code"
          value={form.employee_code}
          onChange={handleChange}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Department</label>
        <br />
        <input
          name="department"
          value={form.department}
          onChange={handleChange}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Designation</label>
        <br />
        <input
          name="designation"
          value={form.designation}
          onChange={handleChange}
        />
      </div>

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