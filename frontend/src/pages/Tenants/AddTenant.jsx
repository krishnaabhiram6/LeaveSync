import { useState } from "react";
import { createTenant } from "../../services/tenantService";

function AddTenant({ isOpen, onClose, fetchTenants }) {
  const [form, setForm] = useState({
    company_name: "",
    slug: "",
    schema_name: "",
    admin_name: "",
    admin_email: "",
    admin_password: "",
  });

  if (!isOpen) return null;

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
      onClose();
    } catch (error) {
      console.log(error);
      if (error.response) {
        alert(JSON.stringify(error.response.data));
      } else {
        alert("Failed");
      }
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.75)",
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          width: "620px",
          background: "#ffffff",
          borderRadius: "18px",
          padding: "35px",
          boxShadow: "0 25px 70px rgba(15,23,42,0.35)",
          border: "1px solid #e2e8f0",
        }}
      >
        <h2
          style={{
            margin: 0,
            marginBottom: "30px",
            textAlign: "center",
            color: "#0f172a",
            fontSize: "32px",
            fontWeight: "700",
          }}
        >
          Add Tenant
        </h2>

        <div style={{ display: "grid", gap: "15px" }}>
          <input name="company_name" placeholder="Company Name" value={form.company_name} onChange={handleChange} style={inputStyle} />
          <input name="slug" placeholder="Slug" value={form.slug} onChange={handleChange} style={inputStyle} />
          <input name="schema_name" placeholder="Schema Name" value={form.schema_name} onChange={handleChange} style={inputStyle} />
          <input name="admin_name" placeholder="Admin Name" value={form.admin_name} onChange={handleChange} style={inputStyle} />
          <input type="email" name="admin_email" placeholder="Admin Email" value={form.admin_email} onChange={handleChange} style={inputStyle} />
          <input type="password" name="admin_password" placeholder="Admin Password" value={form.admin_password} onChange={handleChange} style={inputStyle} />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "30px", gap: "10px" }}>
          <button
            onClick={onClose}
            style={{
              padding: "12px 24px",
              border: "none",
              borderRadius: "10px",
              background: "#64748b",
              color: "#ffffff",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            style={{
              padding: "12px 24px",
              border: "none",
              borderRadius: "10px",
              background: "#2563eb",
              color: "#ffffff",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(37,99,235,.35)",
            }}
          >
            Add Tenant
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  border: "1px solid #cbd5e1",
  borderRadius: "10px",
  background: "#ffffff",
  color: "#0f172a",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
  transition: "0.2s",
};

export default AddTenant;