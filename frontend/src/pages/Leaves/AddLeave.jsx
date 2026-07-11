import { useState } from "react";
import { createLeave } from "../../services/leaveService";

function AddLeave({ fetchLeaves }) {
  const [form, setForm] = useState({
    leave_type_id: "",
    start_date: "",
    end_date: "",
    reason: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await createLeave({
        ...form,
        leave_type_id: Number(form.leave_type_id),
      });

      alert("Leave Applied Successfully");

      fetchLeaves();

      setForm({
        leave_type_id: "",
        start_date: "",
        end_date: "",
        reason: "",
      });

    } catch (error) {
      console.log(error);
      alert("Failed to Apply Leave");
    }
  };

  return (
    <div style={{ marginBottom: "30px" }}>

      <h2>Apply Leave</h2>

      <input
        name="leave_type_id"
        placeholder="Leave Type ID"
        value={form.leave_type_id}
        onChange={handleChange}
      />

      <input
        type="date"
        name="start_date"
        value={form.start_date}
        onChange={handleChange}
      />

      <input
        type="date"
        name="end_date"
        value={form.end_date}
        onChange={handleChange}
      />

      <input
        name="reason"
        placeholder="Reason"
        value={form.reason}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>
        Apply Leave
      </button>

    </div>
  );
}

export default AddLeave;