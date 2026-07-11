import { useEffect, useState } from "react";
import { updateLeave } from "../../services/leaveService";

function EditLeave({
  selectedLeave,
  fetchLeaves,
  onClose,
}) {

  const [form, setForm] = useState({
    leave_type_id: "",
    start_date: "",
    end_date: "",
    reason: "",
  });

  useEffect(() => {
    if (selectedLeave) {
      setForm({
        leave_type_id: selectedLeave.leave_type_id,
        start_date: selectedLeave.start_date,
        end_date: selectedLeave.end_date,
        reason: selectedLeave.reason,
      });
    }
  }, [selectedLeave]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {

      await updateLeave(
        selectedLeave.id,
        {
          ...form,
          leave_type_id: Number(form.leave_type_id),
        }
      );

      alert("Leave Updated Successfully");

      fetchLeaves();

      onClose();

    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  if (!selectedLeave) return null;

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <h2>Edit Leave</h2>

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

      <br /><br />

      <button onClick={handleUpdate}>
        Update
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

export default EditLeave;