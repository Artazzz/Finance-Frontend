import React from "react";

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("id-ID");
}

function formatAmount(amount) {
  if (amount == null) return "-";
  const num = Number(amount);
  if (Number.isNaN(num)) return amount;
  return num.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });
}

function prettyType(type) {
  if (type === "income") return "Pemasukan";
  if (type === "expense") return "Pengeluaran";
  return type;
}

export default function TransactionTable({
  transactions = [],
  loading,
  onEdit,
  onDelete,
}) {
  return (
    <div>
      <h2 className="section-title" style={{ fontSize: "1.1rem" }}>
        Riwayat Transaksi
      </h2>

      <div className="table-wrapper" style={{ marginTop: 12 }}>
        <table className="table">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Tipe</th>
              <th>Nominal</th>
              <th>Deskripsi</th>
              <th style={{ textAlign: "right" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: 16 }}>
                  Memuat data...
                </td>
              </tr>
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: 16 }}>
                  Belum ada transaksi
                </td>
              </tr>
            ) : (
              transactions.map((trx) => (
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
                      {prettyType(trx.type)}
                    </span>
                  </td>
                  <td>{formatAmount(trx.amount)}</td>
                  <td>{trx.description || "-"}</td>
                  <td
                    style={{
                      textAlign: "right",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <button
                      className="btn-outline btn-sm"
                      style={{ marginRight: 8 }}
                      onClick={() => onEdit(trx)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-danger btn-sm"
                      onClick={() => onDelete(trx.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
