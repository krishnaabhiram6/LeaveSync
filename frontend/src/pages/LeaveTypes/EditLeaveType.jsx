import { useEffect, useState } from "react";
import { updateLeaveType } from "../../services/leaveTypeService";

function EditLeaveType({
  selectedLeaveType,
  fetchLeaveTypes,
  onClose,
}) {

  const [form, setForm] = useState({
    name: "",
    max_days_per_year: "",
  });

  useEffect(() => {
    if (selectedLeaveType) {
      setForm({
        name: selectedLeaveType.name,
        max_days_per_year: selectedLeaveType.max_days_per_year,
      });
    }
  }, [selectedLeaveType]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {

      await updateLeaveType(
        selectedLeaveType.id,
        {
          ...form,
          max_days_per_year: Number(form.max_days_per_year),
        }
      );

      alert("Leave Type Updated Successfully");

      fetchLeaveTypes();

      onClose();

    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  if (!selectedLeaveType) return null;

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <h2>Edit Leave Type</h2>

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

export default EditLeaveType;