import { useEffect, useState } from "react";
import { updateTenant } from "../../services/tenantService";

function EditTenant({
  isOpen,
  selectedTenant,
  fetchTenants,
  onClose,
}) {
  const [form, setForm] = useState({
    company_name: "",
    slug: "",
    schema_name: "",
  });

  useEffect(() => {
    if (selectedTenant) {
      setForm({
        company_name: selectedTenant.company_name || "",
        slug: selectedTenant.slug || "",
        schema_name: selectedTenant.schema_name || "",
      });
    }
  }, [selectedTenant]);

  if (!isOpen || !selectedTenant) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await updateTenant(selectedTenant.id, form);

      alert("Tenant Updated Successfully");

      fetchTenants();

      onClose();
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(JSON.stringify(error.response.data));
      } else {
        alert("Update Failed");
      }
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          width: "500px",
          background: "#fff",
          borderRadius: "14px",
          padding: "30px",
          boxShadow: "0 20px 50px rgba(0,0,0,.25)",
        }}
      >
        <h2
          style={{
            marginTop: 0,
            marginBottom: "25px",
            color: "#0f172a",
          }}
        >
          Edit Tenant
        </h2>

        <div
          style={{
            display: "grid",
            gap: "15px",
          }}
        >
          <input
            name="company_name"
            placeholder="Company Name"
            value={form.company_name}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="slug"
            placeholder="Slug"
            value={form.slug}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="schema_name"
            placeholder="Schema Name"
            value={form.schema_name}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            marginTop: "30px",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "10px 18px",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            style={{
              padding: "10px 18px",
              border: "none",
              borderRadius: "8px",
              background: "#2563eb",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

export default EditTenant;