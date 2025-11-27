import { formatCurrency } from "../../utils/formatCurrency";

export default function TransactionTable({ transactions }) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "8px",
      }}
    >
      <thead>
        <tr>
          <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
            Tanggal
          </th>
          <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
            Tipe
          </th>
          <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
            Nominal
          </th>
          <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
            Deskripsi
          </th>
        </tr>
      </thead>
      <tbody>
        {transactions.length === 0 && (
          <tr>
            <td colSpan="4" style={{ padding: "8px", textAlign: "center" }}>
              Belum ada transaksi
            </td>
          </tr>
        )}
        {transactions.map((tx) => (
          <tr key={tx.id}>
            <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
              {tx.date}
            </td>
            <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
              {tx.type === "income" ? "Pemasukan" : "Pengeluaran"}
            </td>
            <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
              {formatCurrency(tx.amount)}
            </td>
            <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
              {tx.description}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
