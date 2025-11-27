import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setError("Email dan password wajib diisi");
      return;
    }

    // Sementara: login dummy, nanti diganti panggil API Laravel
    localStorage.setItem("token", "dummy-token");
    navigate("/");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "60px auto" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "8px" }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            style={{ width: "100%" }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "8px" }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            style={{ width: "100%" }}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Masuk</button>
      </form>
    </div>
  );
}
