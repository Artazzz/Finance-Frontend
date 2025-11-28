// src/service/transactionService.js
import axios from "axios";

const API_URL = "http://130.61.112.167:8000/api";

export async function getTransactions(params = {}) {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${API_URL}/transactions`, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // withCredentials: true, // ❌ JANGAN PAKAI INI
  });

  return res.data;
}

export async function createTransaction(data) {
  const token = localStorage.getItem("token");

  const res = await axios.post(`${API_URL}/transactions`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // withCredentials: true, // ❌ HAPUS
  });

  return res.data;
}

export async function updateTransaction(id, data) {
  const token = localStorage.getItem("token");

  const res = await axios.put(`${API_URL}/transactions/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // withCredentials: true, // ❌ HAPUS
  });

  return res.data;
}

// HAPUS transaksi
export async function deleteTransaction(id) {
  const token = localStorage.getItem("token");

  const res = await axios.delete(`${API_URL}/transactions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // withCredentials: true, // ❌ JANGAN ADA
  });

  return res.data;
}
