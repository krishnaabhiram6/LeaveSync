import api from "../api/api";

export const getNotifications = async () => {
  const response = await api.get("/notifications/");
  return response.data;
};

export const createNotification = async (notification) => {
  const response = await api.post("/notifications/", notification);
  return response.data;
};

export const updateNotification = async (id, notification) => {
  const response = await api.put(`/notifications/${id}`, notification);
  return response.data;
};

export const deleteNotification = async (id) => {
  const response = await api.delete(`/notifications/${id}`);
  return response.data;
};