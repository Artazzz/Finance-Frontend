import { useState } from "react";
import TransactionForm from "../../components/ui/TransactionForm";
import TransactionTable from "../../components/ui/TransactionTable";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([
    // data dummy sementara
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
      <h2>Transaksi</h2>
      <TransactionForm onSubmit={handleAddTransaction} />
      <TransactionTable transactions={transactions} />
    </div>
  );
}
