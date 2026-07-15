import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  const tenant = localStorage.getItem("tenant");

  console.log("TOKEN =", token);
  console.log("TENANT =", tenant);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (tenant) {
    config.headers["X-Tenant"] = tenant;
  }

  console.log("FINAL HEADERS =", config.headers);

  return config;
});

export default api;