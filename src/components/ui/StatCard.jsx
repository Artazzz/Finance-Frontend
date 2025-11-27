import { formatCurrency } from "../../utils/formatCurrency";

export default function StatCard({ title, value }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "12px 16px",
        minWidth: "180px",
      }}
    >
      <div style={{ fontSize: "14px", color: "#555" }}>{title}</div>
      <div style={{ fontSize: "20px", fontWeight: "bold" }}>
        {formatCurrency(value)}
      </div>
    </div>
  );
}
