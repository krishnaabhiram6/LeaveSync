import { useState } from "react";
import { createLeaveType } from "../../services/leaveTypeService";

function AddLeaveType({ fetchLeaveTypes }) {

  const [form, setForm] = useState({
    name: "",
    max_days_per_year: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {

      await createLeaveType({
        ...form,
        max_days_per_year: Number(form.max_days_per_year),
      });

      alert("Leave Type Added Successfully");

      fetchLeaveTypes();

      setForm({
        name: "",
        max_days_per_year: "",
      });

    } catch (error) {
      console.log(error);
      alert("Failed");
    }
  };

  return (
    <div style={{ marginBottom: "30px" }}>

      <h2>Add Leave Type</h2>

      <input
        name="name"
        placeholder="Leave Type"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="max_days_per_year"
        placeholder="Max Days"
        value={form.max_days_per_year}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>
        Add
      </button>

    </div>
  );
}

export default AddLeaveType;