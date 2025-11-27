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
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-field">
          <label>Tanggal</label>
          <input
            type="date"
            className="input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label>Tipe</label>
          <select
            className="select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="income">Pemasukan</option>
            <option value="expense">Pengeluaran</option>
          </select>
        </div>

        <div className="form-field">
          <label>Nominal</label>
          <input
            type="number"
            className="input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label>Deskripsi</label>
          <input
            type="text"
            className="input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div style={{ marginTop: "12px" }}>
        <button type="submit" className="btn-primary">
          Simpan Transaksi
        </button>
      </div>
    </form>
  );
}
