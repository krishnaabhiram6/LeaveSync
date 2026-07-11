import api from "../api/api";

export const getLeaveTypes = async () => {
  const response = await api.get("/leave-types/");
  return response.data;
};

export const createLeaveType = async (leaveType) => {
  const response = await api.post("/leave-types/", leaveType);
  return response.data;
};

export const updateLeaveType = async (id, leaveType) => {
  const response = await api.put(`/leave-types/${id}`, leaveType);
  return response.data;
};

export const deleteLeaveType = async (id) => {
  const response = await api.delete(`/leave-types/${id}`);
  return response.data;
};