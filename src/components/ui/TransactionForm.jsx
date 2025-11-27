import { useState } from "react";

export default function TransactionForm({ onSubmit }) {
  const [date, setDate] = useState("");
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !amount) return;

    onSubmit({
      date,
      type,
      amount: Number(amount),
      description,
    });

    setDate("");
    setType("income");
    setAmount("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginTop: "16px", marginBottom: "16px" }}
    >
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <div>
          <label>Tanggal</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Tipe</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Pemasukan</option>
            <option value="expense">Pengeluaran</option>
          </select>
        </div>
        <div>
          <label>Nominal</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label>Deskripsi</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <button type="submit" style={{ marginTop: "8px" }}>
        Simpan Transaksi
      </button>
    </form>
  );
}
