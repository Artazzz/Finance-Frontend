// src/pages/auth/RegisterPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../service/authService";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !passwordConfirmation) {
      setError("Semua field wajib diisi");
      return;
    }
    if (password !== passwordConfirmation) {
      setError("Konfirmasi password tidak sama");
      return;
    }

    try {
      setLoading(true);
      await register({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      const apiErrors = err.response?.data?.errors;
      const apiMessage = err.response?.data?.message;
      let msg = apiMessage || "Register gagal. Coba lagi.";

      if (apiErrors) {
        const firstKey = Object.keys(apiErrors)[0];
        if (firstKey && apiErrors[firstKey]?.[0]) {
          msg = apiErrors[firstKey][0];
        }
      }

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 24px",
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: 520,
          width: "100%",
          padding: "32px 36px",
          borderRadius: 16,
        }}
      >
        <h2 style={{ marginBottom: 8, fontSize: "1.8rem" }}>Daftar Akun</h2>
        <p style={{ color: "#9ca3af", marginBottom: 20 }}>
          Buat akun untuk menggunakan Sistem Manajemen Keuangan.
        </p>

        {error && (
          <div
            style={{
              color: "#f87171",
              fontSize: "0.9rem",
              marginBottom: 14,
            }}
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: "0.9rem" }}>Nama</label>
            <input
              type="text"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama lengkap"
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: "0.9rem" }}>Email</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="habiel@example.com"
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: "0.9rem" }}>Password</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimal 8 karakter"
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: "0.9rem" }}>Konfirmasi Password</label>
            <input
              type="password"
              className="input"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder="Ulangi password"
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{
              marginTop: 4,
              height: 46,
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            {loading ? "Mendaftarkan..." : "Daftar"}
          </button>
        </form>

        <div
          style={{
            marginTop: 16,
            fontSize: "0.85rem",
            color: "#9ca3af",
            textAlign: "center",
          }}
        >
          Sudah punya akun?{" "}
          <Link
            to="/login"
            style={{ color: "#22c55e", textDecoration: "none" }}
          >
            Masuk di sini
          </Link>
        </div>
      </div>
    </div>
  );
}
