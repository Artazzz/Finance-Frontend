import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // nanti kita ganti dengan logout beneran (panggil backend)
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "12px 16px",
        borderBottom: "1px solid #ddd",
        marginBottom: "16px",
      }}
    >
      <div>
        <strong>Sistem Manajemen Keuangan</strong>
      </div>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <Link to="/">Dashboard</Link>
        <Link to="/transactions">Transaksi</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
