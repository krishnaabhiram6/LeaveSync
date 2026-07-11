import api from "../api/api";

export const getTenants = async () => {
  const response = await api.get("/tenants/");
  return response.data;
};

export const createTenant = async (tenant) => {
  const response = await api.post("/tenants/", tenant);
  return response.data;
};

export const updateTenant = async (id, tenant) => {
  const response = await api.put(`/tenants/${id}`, tenant);
  return response.data;
};

export const deleteTenant = async (id) => {
  const response = await api.delete(`/tenants/${id}`);
  return response.data;
};