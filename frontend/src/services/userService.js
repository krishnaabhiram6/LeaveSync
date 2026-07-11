import api from "../api/api";

const getToken = () => {
  return localStorage.getItem("access_token");
};

export const getUsers = async () => {
  const response = await api.get("/users/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const createUser = async (user) => {
  const response = await api.post("/users/", user, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await api.put(`/users/${id}`, user, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};