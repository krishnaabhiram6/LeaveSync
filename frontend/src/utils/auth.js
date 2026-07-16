import { jwtDecode } from "jwt-decode";

export function getToken() {
  return localStorage.getItem("access_token");
}

export function getRole() {
  const token = getToken();

  if (!token) return null;

  try {
    const decoded = jwtDecode(token);

    const roles = decoded.realm_access?.roles || [];

    if (roles.includes("SuperAdmin")) return "SuperAdmin";
    if (roles.includes("Admin")) return "Admin";
    if (roles.includes("Manager")) return "Manager";
    if (roles.includes("HR")) return "HR";
    if (roles.includes("Employee")) return "Employee";

    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export function getEmail() {
  const token = getToken();

  if (!token) return "";

  try {
    return jwtDecode(token).email;
  } catch {
    return "";
  }
}

export function getName() {
  const token = getToken();

  if (!token) return "";

  try {
    return (
      jwtDecode(token).given_name ||
      jwtDecode(token).preferred_username ||
      ""
    );
  } catch {
    return "";
  }
}

export function isLoggedIn() {
  return !!getToken();
}

export function logout() {
  localStorage.clear();
  window.location.href = "/tenant-login";
}