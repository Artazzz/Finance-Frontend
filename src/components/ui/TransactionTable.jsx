import { formatCurrency } from "../../utils/formatCurrency";

export default function TransactionTable({ transactions }) {
  return (
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
        {transactions.length === 0 && (
          <tr>
            <td colSpan="4" style={{ textAlign: "center", padding: "8px" }}>
              Belum ada transaksi
            </td>
          </tr>
        )}

        {transactions.map((tx) => (
          <tr key={tx.id}>
            <td>{tx.date}</td>
            <td>
              <span
                className={
                  tx.type === "income" ? "badge-income" : "badge-expense"
                }
              >
                {tx.type === "income" ? "Pemasukan" : "Pengeluaran"}
              </span>
            </td>
            <td>{formatCurrency(tx.amount)}</td>
            <td>{tx.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
