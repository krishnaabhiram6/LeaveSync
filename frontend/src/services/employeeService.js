import api from "../api/api";

const getToken = () => {
  return localStorage.getItem("access_token");
};

export const getEmployees = async () => {
  const response = await api.get("/employees/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const createEmployee = async (employee) => {
  const response = await api.post("/employees/", employee, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const updateEmployee = async (id, employee) => {
  const response = await api.put(`/employees/${id}`, employee, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const deleteEmployee = async (id) => {
  const response = await api.delete(`/employees/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const getAvailableEmployees = async () => {
  const response = await api.get("/users/available-employees");
  return response.data;
};