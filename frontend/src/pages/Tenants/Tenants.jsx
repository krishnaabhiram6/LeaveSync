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

      alert("Tenant Deleted Successfully");

      fetchTenants();
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

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <div>
          <h1>Tenants</h1>

          <p
            style={{
              color: "#64748b",
            }}
          >
            Manage all registered companies
          </p>
        </div>

        <AddTenant fetchTenants={fetchTenants} />
      </div>

      <input
        type="text"
        placeholder="Search Tenant..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "350px",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          marginBottom: "20px",
        }}
      />

      <EditTenant
        selectedTenant={selectedTenant}
        fetchTenants={fetchTenants}
        onClose={() => setSelectedTenant(null)}
      />

      <div
        style={{
          background: "white",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 5px 15px rgba(0,0,0,.08)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead
            style={{
              background: "#1e293b",
              color: "white",
            }}
          >
            <tr>
              <th style={{ padding: "15px" }}>ID</th>
              <th>Company</th>
              <th>Schema</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredTenants.map((tenant) => (

              <tr
                key={tenant.id}
                style={{
                  borderBottom: "1px solid #eee",
                }}
              >
                <td style={{ padding: "15px" }}>
                  {tenant.id}
                </td>

                <td>{tenant.company_name}</td>

                <td>{tenant.schema_name}</td>

                <td>

                  <button
                    onClick={() =>
                      setSelectedTenant(tenant)
                    }
                    style={{
                      marginRight: "10px",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(tenant.id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

            {filteredTenants.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "center",
                    padding: "30px",
                  }}
                >
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