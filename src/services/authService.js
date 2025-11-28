import apiClient from "./apiClient";

export async function login(credentials) {
  const response = await apiClient.post("/login", credentials);
  const data = response.data || {};

  const token =
    data.token ||
    data.access_token ||
    (data.data && data.data.token);

  const user =
    data.user ||
    (data.data && data.data.user) ||
    null;

  if (!token) {
    throw new Error("Token tidak ditemukan di respons backend");
  }

  localStorage.setItem("token", token);
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  return user;
}

export async function logout() {
  try {
    await apiClient.post("/logout");
  } catch (e) {
    console.error("Logout error:", e);
  }
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
