import { useEffect, useState } from "react";
import {
  getTenants,
  deleteTenant,
} from "../../services/tenantService";

import AddTenant from "./AddTenant";
import EditTenant from "./EditTenant";

function Tenants() {
  const [tenants, setTenants] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      const data = await getTenants();
      setTenants(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Tenant?")) return;
    try {
      await deleteTenant(id);
      fetchTenants();
      alert("Tenant Deleted Successfully");
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  const filteredTenants = tenants.filter((tenant) => {
    const value = search.toLowerCase();
    return (
      tenant.company_name.toLowerCase().includes(value) ||
      tenant.schema_name.toLowerCase().includes(value)
    );
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "35px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "34px", fontWeight: "700", color: "#0f172a" }}>Tenants</h1>
          <p style={{ marginTop: "8px", color: "#64748b", fontSize: "15px" }}>Manage all registered companies</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          style={{ background: "#2563eb", color: "white", border: "none", padding: "12px 22px", borderRadius: "10px", cursor: "pointer", fontWeight: "600", fontSize: "15px" }}
        >
          + Add Tenant
        </button>
      </div>

      <input
        type="text"
        placeholder="Search Tenant..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "380px", padding: "13px 16px", borderRadius: "10px", border: "1px solid #cbd5e1", outline: "none", marginBottom: "25px" }}
      />

      <AddTenant isOpen={showAddModal} onClose={() => setShowAddModal(false)} fetchTenants={fetchTenants} />

      <EditTenant
        isOpen={showEditModal}
        selectedTenant={selectedTenant}
        fetchTenants={fetchTenants}
        onClose={() => {
          setShowEditModal(false);
          setSelectedTenant(null);
        }}
      />

      <div style={{ background: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 10px 30px rgba(15,23,42,.08)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#0f172a", color: "white" }}>
            <tr>
              <th style={{ padding: "18px" }}>ID</th>
              <th style={{ padding: "18px" }}>Company</th>
              <th style={{ padding: "18px" }}>Schema</th>
              <th style={{ padding: "18px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTenants.map((tenant) => (
              <tr key={tenant.id} style={{ borderBottom: "1px solid #e2e8f0", height: "60px" }}>
                <td style={{ padding: "18px" }}>{tenant.id}</td>
                <td>{tenant.company_name}</td>
                <td>{tenant.schema_name}</td>
                <td>
                  <button
                    onClick={() => {
                      setSelectedTenant(tenant);
                      setShowEditModal(true);
                    }}
                    style={{ background: "#2563eb", color: "white", border: "none", borderRadius: "6px", padding: "8px 14px", marginRight: "10px", cursor: "pointer" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(tenant.id)}
                    style={{ background: "#dc2626", color: "white", border: "none", borderRadius: "6px", padding: "8px 14px", cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredTenants.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "35px", color: "#64748b" }}>
                  No Tenants Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tenants;