import api from "../api/api";

export const getUsers = async () => {
  console.log("GET USERS CALLED");

  const response = await api.get("/users/");

  return response.data;
};

export const createUser = async (user) => {
  const response = await api.post("/users/", user);
  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await api.put(`/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};