import { useState } from "react";
import TransactionForm from "../../components/ui/TransactionForm";
import TransactionTable from "../../components/ui/TransactionTable";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: "2025-01-01",
      type: "income",
      amount: 1500000,
      description: "Gaji",
    },
    {
      id: 2,
      date: "2025-01-02",
      type: "expense",
      amount: 50000,
      description: "Makan siang",
    },
  ]);

  const handleAddTransaction = (newTx) => {
    setTransactions((prev) => [...prev, { id: Date.now(), ...newTx }]);
  };

  return (
    <div>
      <div style={{ marginBottom: "8px" }}>
        <div className="section-title">Transaksi</div>
        <div className="section-subtitle">
          Catat pemasukan dan pengeluaran harian Anda di sini.
        </div>
      </div>

      <div className="transactions-layout">
        <div className="card">
          <TransactionForm onSubmit={handleAddTransaction} />
        </div>

        <div className="card">
          <TransactionTable transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
