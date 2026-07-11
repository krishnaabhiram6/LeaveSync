import api from "../api/api";

export const getLeaves = async () => {
  const response = await api.get("/leaves/");
  return response.data;
};

export const createLeave = async (leave) => {
  const response = await api.post("/leaves/", leave);
  return response.data;
};

export const updateLeave = async (id, leave) => {
  const response = await api.put(`/leaves/${id}`, leave);
  return response.data;
};

export const deleteLeave = async (id) => {
  const response = await api.delete(`/leaves/${id}`);
  return response.data;
};

export const approveLeave = async (id) => {
  const response = await api.put(`/leaves/${id}/approve`);
  return response.data;
};

export const rejectLeave = async (id) => {
  const response = await api.put(`/leaves/${id}/reject`);
  return response.data;
};