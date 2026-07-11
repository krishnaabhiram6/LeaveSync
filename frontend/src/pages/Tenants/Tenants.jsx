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

    await deleteTenant(id);

    fetchTenants();
  };

  return (
    <div>

      <h1>Tenants</h1>

      <EditTenant
        selectedTenant={selectedTenant}
        fetchTenants={fetchTenants}
        onClose={() => setSelectedTenant(null)}
      />

      <AddTenant fetchTenants={fetchTenants} />

      <table border="1" cellPadding="10">

        <thead>

          <tr>
            <th>ID</th>
            <th>Company Name</th>
            <th>Schema Name</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {tenants.map((tenant) => (

            <tr key={tenant.id}>

              <td>{tenant.id}</td>

              <td>{tenant.company_name}</td>

              <td>{tenant.schema_name}</td>

              <td>

                <button
                  onClick={() =>
                    setSelectedTenant(tenant)
                  }
                >
                  Edit
                </button>

                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() =>
                    handleDelete(tenant.id)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Tenants;