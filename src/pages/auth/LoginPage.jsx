// src/pages/auth/LoginPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/authService";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan password wajib diisi");
      return;
    }

    try {
      setLoading(true);
      await login({ email, password });
      navigate("/");
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.email?.[0] ||
        "Login gagal. Periksa email/password atau server backend.";
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
          maxWidth: 480,
          width: "100%",
          padding: "32px 36px",
          borderRadius: 16,
        }}
      >
        <h2 style={{ marginBottom: 8, fontSize: "1.8rem" }}>Masuk</h2>
        <p style={{ color: "#9ca3af", marginBottom: 20 }}>
          Login untuk mengakses beranda.
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
            gap: 18,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: "0.9rem" }}>Email</label>
            <input
              type="email"
              className="input"
              placeholder="habiel@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                height: 44,
                fontSize: "0.95rem",
                padding: "10px 14px",
                borderRadius: 10,
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: "0.9rem" }}>Password</label>
            <input
              type="password"
              className="input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                height: 44,
                fontSize: "0.95rem",
                padding: "10px 14px",
                borderRadius: 10,
              }}
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
              width: "100%",
            }}
          >
            {loading ? "Masuk..." : "Masuk"}
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
          Belum punya akun?{" "}
          <Link
            to="/register"
            style={{ color: "#22c55e", textDecoration: "none" }}
          >
            Daftar di sini
          </Link>
        </div>
      </div>
    </div>
  );
}
