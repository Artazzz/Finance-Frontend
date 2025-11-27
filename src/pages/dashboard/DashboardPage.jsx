// src/pages/dashboard/DashboardPage.jsx
import StatCard from "../../components/ui/StatCard";

export default function DashboardPage() {
  const totalIncome = 2000000;
  const totalExpense = 750000;
  const balance = totalIncome - totalExpense;

  return (
    <div>
      <h2>Dashboard Keuangan</h2>

      <div className="dashboard-grid">
        <StatCard title="Total Pemasukan" value={totalIncome} />
        <StatCard title="Total Pengeluaran" value={totalExpense} />
        <StatCard title="Saldo Akhir" value={balance} />
      </div>
    </div>
  );
}
