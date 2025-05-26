import React, { useState } from "react";

const inputStyle = {
  width: "100%",
  padding: "12px 15px",
  marginBottom: 20,
  borderRadius: 6,
  border: "1.5px solid #1565c0",
  fontSize: 16,
  outline: "none",
  transition: "border-color 0.3s ease",
};

const buttonStyle = {
  width: "100%",
  padding: "14px 0",
  backgroundColor: "#1976d2",
  color: "white",
  border: "none",
  borderRadius: 8,
  fontWeight: "bold",
  fontSize: 18,
  cursor: "pointer",
  boxShadow: "0 3px 8px rgba(25, 118, 210, 0.5)",
  transition: "background-color 0.3s ease",
};

export default function RegisterForm({ onRegisterSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL || "https://notes-backend197-174534490336.us-central1.run.app"}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setSuccess("Registrasi berhasil! Silakan login.");
        setUsername("");
        setPassword("");
        onRegisterSuccess();
      } else {
        setError(data.error || data.message || "Registrasi gagal");
      }
    } catch {
      setError("Gagal menghubungi server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ color: "#1a237e", textAlign: "center", marginBottom: 25 }}>
        Register
      </h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={inputStyle}
        onFocus={(e) => (e.target.style.borderColor = "#0d47a1")}
        onBlur={(e) => (e.target.style.borderColor = "#1565c0")}
        disabled={loading}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ ...inputStyle, marginBottom: 30 }}
        onFocus={(e) => (e.target.style.borderColor = "#0d47a1")}
        onBlur={(e) => (e.target.style.borderColor = "#1565c0")}
        disabled={loading}
      />
      <button
        type="submit"
        style={{
          ...buttonStyle,
          backgroundColor: loading ? "#115293" : buttonStyle.backgroundColor,
          cursor: loading ? "not-allowed" : buttonStyle.cursor,
        }}
        disabled={loading}
        onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = "#115293")}
        onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = "#1976d2")}
      >
        {loading ? "Memproses..." : "Daftar"}
      </button>

      {/* <div
        style={{
          marginTop: 20,
          textAlign: "center",
          fontSize: 14,
          color: "#333",
        }}
      >
        Sudah punya akun?{" "}
        <span
          onClick={() => onRegisterSuccess(false)} // nanti onRegisterSuccess dipakai toggle di parent
          style={{ color: "#1565c0", textDecoration: "underline", cursor: "pointer" }}
        >
          Login di sini
        </span>
      </div> */}

      {error && (
        <p
          style={{
            marginTop: 20,
            color: "#b00020",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          {error}
        </p>
      )}

      {success && (
        <p
          style={{
            marginTop: 20,
            color: "#2e7d32",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          {success}
        </p>
      )}
    </form>
  );
}
