import { useState } from "react";
import { createTenant } from "../../services/tenantService";

function AddTenant({ fetchTenants }) {

  const [form, setForm] = useState({
    company_name: "",
    schema_name: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {

      await createTenant(form);

      alert("Tenant Added Successfully");

      fetchTenants();

      setForm({
        company_name: "",
        schema_name: "",
      });

    } catch (error) {
      console.log(error);
      alert("Failed");
    }
  };

  return (
    <div style={{ marginBottom: "30px" }}>

      <h2>Add Tenant</h2>

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

      <button onClick={handleSubmit}>
        Add Tenant
      </button>

    </div>
  );
}

export default AddTenant;