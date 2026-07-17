import api from "../api/api";

export const getLeaveBalances = async () => {
  const response = await api.get("/leave-balances/");
  return response.data;
};

export const createLeaveBalance = async (leaveBalance) => {
  const response = await api.post("/leave-balances/", leaveBalance);
  return response.data;
};

export const updateLeaveBalance = async (id, leaveBalance) => {
  const response = await api.put(
    `/leave-balances/${id}`,
    leaveBalance
  );

  return response.data;
};

export const deleteLeaveBalance = async (id) => {
  const response = await api.delete(
    `/leave-balances/${id}`
  );

  return response.data;
};


export const getMyLeaveBalances = async () => {
  const response = await api.get("/leave-balances/my");
  return response.data;
};