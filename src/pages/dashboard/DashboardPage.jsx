import StatCard from "../../components/ui/StatCard";

export default function DashboardPage() {
  // sementara nilai dummy – nanti diisi dari API Laravel
  const totalIncome = 2000000;
  const totalExpense = 750000;
  const balance = totalIncome - totalExpense;

  return (
    <div>
      <h2>Dashboard Keuangan</h2>
      <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
        <StatCard title="Total Pemasukan" value={totalIncome} />
        <StatCard title="Total Pengeluaran" value={totalExpense} />
        <StatCard title="Saldo Akhir" value={balance} />
      </div>
    </div>
  );
}
