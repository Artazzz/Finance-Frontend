import { useEffect, useState } from "react";

export default function TransactionForm({
  onSubmit,
  onUpdate,
  loading,
  editing,
  onCancelEdit,
}) {
  const [date, setDate] = useState("");
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editing) {
      setDate(editing.date || "");
      const t = editing.type || "income";
      if (t === "Pemasukan") setType("income");
      else if (t === "Pengeluaran") setType("expense");
      else setType(t);

      setAmount(editing.amount || "");
      setCategory(editing.category || "");
      setDescription(editing.description || "");
    } else {
      setDate("");
      setType("income");
      setAmount("");
      setCategory("");
      setDescription("");
    }
  }, [editing]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      date,
      type,
      amount,
      category,
      description,
    };

    if (editing) {
      onUpdate(editing.id, payload);
    } else {
      onSubmit(payload);
    }
  };

  return (
    <div className="card">
      <h2 className="section-title" style={{ fontSize: "1.1rem" }}>
        {editing ? "Edit Transaksi" : "Tambah Transaksi"}
      </h2>
      <p className="section-subtitle" style={{ marginBottom: 12 }}>
        Isi data transaksi dengan lengkap.
      </p>

      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-field">
          <label>Tanggal</label>
          <input
            type="date"
            className="input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
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
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label>Kategori</label>
          <input
            type="text"
            className="input"
            placeholder="contoh: Gaji, Makan, Transport"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div className="form-field" style={{ gridColumn: "1 / -1" }}>
          <label>Deskripsi</label>
          <input
            type="text"
            className="input"
            placeholder="Deskripsi singkat..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div
          style={{
            gridColumn: "1 / -1",
            display: "flex",
            gap: 8,
            marginTop: 8,
          }}
        >
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading
              ? "Menyimpan..."
              : editing
              ? "Simpan Perubahan"
              : "Simpan Transaksi"}
          </button>

          {editing && (
            <button
              type="button"
              className="btn-outline"
              onClick={onCancelEdit}
              disabled={loading}
            >
              Batal
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
