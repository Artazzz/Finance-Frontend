import { formatCurrency } from "../../utils/formatCurrency";

export default function StatCard({ title, value }) {
  return (
    <div
      style={{
        border: "1px solid #334155",          // border lebih soft
        borderRadius: "14px",
        padding: "22px 26px",
        width: "100%",
        height: "130px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "rgba(15,23,42,0.96)",
        boxShadow: "0 18px 35px rgba(0,0,0,0.45)", // efek melayang
      }}
    >
      <div style={{ fontSize: "0.9rem", color: "#9ca3af" }}>{title}</div>
      <div style={{ fontSize: "1.8rem", fontWeight: 700 }}>
        {formatCurrency(value)}
      </div>
    </div>
  );
}
