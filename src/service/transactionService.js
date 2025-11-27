// src/services/transactionService.js
import apiClient from "./apiClient";

export async function getTransactions(params = {}) {
  const response = await apiClient.get("/transactions", { params });
  return response.data; // sesuaikan nanti dengan bentuk JSON Laravel
}

export async function createTransaction(data) {
  const response = await apiClient.post("/transactions", data);
  return response.data;
}
