// src/service/userService.js
import axios from "axios";

const API_URL = "http://130.61.112.167:8000/api";

export async function getCurrentUser() {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}
