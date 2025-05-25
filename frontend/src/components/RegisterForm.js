import React, { useState } from "react";

export default function RegisterForm({ onRegisterSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
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
        setError(data.error || "Registrasi gagal");
      }
    } catch {
      setError("Gagal menghubungi server");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 400,
        margin: "40px auto",
        padding: 30,
        backgroundColor: "#ffffff",
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2 style={{ color: "#1a237e", textAlign: "center", marginBottom: 25 }}>
        Register
      </h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={{
          width: "100%",
          padding: "12px 15px",
          marginBottom: 20,
          borderRadius: 6,
          border: "1.5px solid #1565c0",
          fontSize: 16,
          outline: "none",
          transition: "border-color 0.3s ease",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#0d47a1")}
        onBlur={(e) => (e.target.style.borderColor = "#1565c0")}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{
          width: "100%",
          padding: "12px 15px",
          marginBottom: 30,
          borderRadius: 6,
          border: "1.5px solid #1565c0",
          fontSize: 16,
          outline: "none",
          transition: "border-color 0.3s ease",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#0d47a1")}
        onBlur={(e) => (e.target.style.borderColor = "#1565c0")}
      />
      <button
        type="submit"
        style={{
          width: "100%",
          padding: "14px 0",
          backgroundColor: "#d32f2f",
          color: "white",
          border: "none",
          borderRadius: 8,
          fontWeight: "bold",
          fontSize: 18,
          cursor: "pointer",
          boxShadow: "0 3px 8px rgba(211, 47, 47, 0.5)",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#b71c1c")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#d32f2f")}
      >
        Daftar
      </button>
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
