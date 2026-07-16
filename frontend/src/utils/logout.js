export function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("tenant");
  localStorage.removeItem("role");
  localStorage.removeItem("user");

  window.location.href = "/";
}