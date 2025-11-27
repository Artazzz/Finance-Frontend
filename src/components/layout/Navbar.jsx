import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">Sistem Manajemen Keuangan</div>
      <div className="navbar-links">
        <Link className="navbar-link" to="/">
          Dashboard
        </Link>
        <Link className="navbar-link" to="/transactions">
          Transaksi
        </Link>
        <button className="btn-outline" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
