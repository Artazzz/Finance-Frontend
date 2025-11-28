// src/pages/dashboard/DashboardPage.jsx
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../service/userService";
import { getTransactions } from "../../service/transactionService";

function formatCurrency(amount) {
  if (amount == null) return "Rp 0";
  return Number(amount).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });
}

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("id-ID");
}

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [userRes, trxRes] = await Promise.all([
        getCurrentUser(),
        getTransactions(),
      ]);

      setUser(userRes);

      const trxList = Array.isArray(trxRes) ? trxRes : trxRes.data || [];
      setTransactions(trxList);

      let income = 0;
      let expense = 0;

      trxList.forEach((trx) => {
        if (trx.type === "income") {
          income += Number(trx.amount || 0);
        } else if (trx.type === "expense") {
          expense += Number(trx.amount || 0);
        }
      });

      setTotalIncome(income);
      setTotalExpense(expense);
      setBalance(income - expense);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat data dashboard dari server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="main-content">
      <h1 className="page-title">Finance Dashboard</h1>

      {user && (
        <p className="page-subtitle" style={{ marginBottom: 24 }}>
          Hi, <strong>{user.name}</strong>
        </p>
      )}

      {error && (
        <div className="alert alert-error" style={{ marginBottom: 16 }}>
          {error}
        </div>
      )}

      {/* KARTU RINGKASAN */}
      <div className="dashboard-cards">
        <div className="card summary-card">
          <h3 style={{ fontSize: 14, marginBottom: 8 }}>Total Pemasukan</h3>
          <p style={{ fontSize: 22, fontWeight: 600, color: "#4ade80" }}>
            {formatCurrency(totalIncome)}
          </p>
        </div>

        <div className="card summary-card">
          <h3 style={{ fontSize: 14, marginBottom: 8 }}>Total Pengeluaran</h3>
          <p style={{ fontSize: 22, fontWeight: 600, color: "#f97373" }}>
            {formatCurrency(totalExpense)}
          </p>
        </div>

        <div className="card summary-card">
          <h3 style={{ fontSize: 14, marginBottom: 8 }}>Saldo Bersih</h3>
          <p
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: balance >= 0 ? "#4ade80" : "#f97373",
            }}
          >
            {formatCurrency(balance)}
          </p>
        </div>
      </div>

      {/* TRANSAKSI TERBARU */}
      <div className="card" style={{ padding: 20, marginTop: 8 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 12,
            alignItems: "center",
          }}
        >
          <h2 className="section-title" style={{ fontSize: "1.05rem" }}>
            Transaksi Terbaru
          </h2>
          {loading && (
            <span style={{ fontSize: 12, opacity: 0.7 }}>Memuat...</span>
          )}
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Tipe</th>
              <th>Nominal</th>
              <th>Deskripsi</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", padding: 16 }}>
                  Belum ada transaksi
                </td>
              </tr>
            ) : (
              recentTransactions.map((trx) => (
                <tr key={trx.id}>
                  <td>{formatDate(trx.date)}</td>
                  <td>
                    <span
                      style={{
                        fontSize: 12,
                        padding: "2px 8px",
                        borderRadius: 999,
                        backgroundColor:
                          trx.type === "income"
                            ? "rgba(34,197,94,0.15)"
                            : "rgba(239,68,68,0.15)",
                        color:
                          trx.type === "income" ? "#22c55e" : "#f97373",
                      }}
                    >
                      {trx.type === "income" ? "Pemasukan" : "Pengeluaran"}
                    </span>
                  </td>
                  <td>{formatCurrency(trx.amount)}</td>
                  <td>{trx.description || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
