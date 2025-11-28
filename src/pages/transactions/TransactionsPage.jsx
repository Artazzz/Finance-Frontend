import { useEffect, useState } from "react";

import TransactionForm from "../../components/ui/TransactionForm";
import TransactionTable from "../../components/ui/TransactionTable";

import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../../service/transactionService";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editing, setEditing] = useState(null); // transaksi yg sedang di-edit

  const loadTransactions = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getTransactions();
      setTransactions(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat data transaksi dari server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleCreate = async (payload) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await createTransaction(payload);
      setSuccess("Transaksi berhasil ditambahkan.");
      await loadTransactions();
    } catch (err) {
      console.error(err);
      setError("Gagal menambah transaksi.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id, payload) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await updateTransaction(id, payload);
      setSuccess("Transaksi berhasil diupdate.");
      setEditing(null);
      await loadTransactions();
    } catch (err) {
      console.error(err);
      setError("Gagal mengupdate transaksi.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Yakin ingin menghapus transaksi ini?");
    if (!ok) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await deleteTransaction(id);
      setSuccess("Transaksi berhasil dihapus.");
      await loadTransactions();
    } catch (err) {
      console.error(err);
      setError("Gagal menghapus transaksi.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => setEditing(null);

  return (
    <div className="main-content">
      <h1 className="page-title">Transaksi</h1>
      <p className="page-subtitle">
        Kelola pemasukan dan pengeluaran harian Anda.
      </p>

      {error && (
        <div className="alert alert-error" style={{ marginBottom: 16 }}>
          {error}
        </div>
      )}
      {success && (
        <div className="alert alert-success" style={{ marginBottom: 16 }}>
          {success}
        </div>
      )}

      <div className="transactions-layout">
        <TransactionForm
          onSubmit={handleCreate}
          onUpdate={handleUpdate}
          loading={loading}
          editing={editing}
          onCancelEdit={handleCancelEdit}
        />

        <div className="card">
          <TransactionTable
            transactions={transactions}
            loading={loading}
            onEdit={setEditing}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
