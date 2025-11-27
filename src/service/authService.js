// src/services/authService.js
import apiClient from "./apiClient";

export async function login(credentials) {
  const response = await apiClient.post("/login", credentials);
  const { token, user } = response.data;
  localStorage.setItem("token", token);
  return user;
}

export async function logout() {
  try {
    await apiClient.post("/logout");
  } catch (e) {
    // kalau gagal, abaikan saja di sisi UI
  }
  localStorage.removeItem("token");
}
