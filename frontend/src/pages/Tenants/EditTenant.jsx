import { useEffect, useState } from "react";
import { updateTenant } from "../../services/tenantService";

function EditTenant({
  selectedTenant,
  fetchTenants,
  onClose,
}) {

  const [form, setForm] = useState({
    company_name: "",
    schema_name: "",
  });

  useEffect(() => {
    if (selectedTenant) {
      setForm({
        company_name: selectedTenant.company_name,
        schema_name: selectedTenant.schema_name,
      });
    }
  }, [selectedTenant]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {

      await updateTenant(
        selectedTenant.id,
        form
      );

      alert("Tenant Updated Successfully");

      fetchTenants();

      onClose();

    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  if (!selectedTenant) return null;

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <h2>Edit Tenant</h2>

      <input
        name="company_name"
        placeholder="Company Name"
        value={form.company_name}
        onChange={handleChange}
      />

      <input
        name="schema_name"
        placeholder="Schema Name"
        value={form.schema_name}
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

export default EditTenant;