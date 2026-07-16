import { useState } from "react";
import { createTenant } from "../../services/tenantService";

function AddTenant({ fetchTenants }) {
  const [form, setForm] = useState({
    company_name: "",
    slug: "",
    schema_name: "",
    admin_name: "",
    admin_email: "",
    admin_password: "",
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
        slug: "",
        schema_name: "",
        admin_name: "",
        admin_email: "",
        admin_password: "",
      });
    } catch (error) {
      console.log(error);

      if (error.response) {
        console.log(error.response.data);
        alert(JSON.stringify(error.response.data));
      } else {
        alert("Failed");
      }
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
        name="slug"
        placeholder="Slug (example: oracle)"
        value={form.slug}
        onChange={handleChange}
      />

      <input
        name="schema_name"
        placeholder="Schema Name"
        value={form.schema_name}
        onChange={handleChange}
      />

      <input
        name="admin_name"
        placeholder="Admin Name"
        value={form.admin_name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="admin_email"
        placeholder="Admin Email"
        value={form.admin_email}
        onChange={handleChange}
      />

      <input
        type="password"
        name="admin_password"
        placeholder="Admin Password"
        value={form.admin_password}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>
        Add Tenant
      </button>
    </div>
  );
}

export default AddTenant;