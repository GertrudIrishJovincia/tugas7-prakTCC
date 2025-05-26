import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL || "https://notes-backend197-174534490336.us-central1.run.app"}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/"); // pindah ke halaman utama (UserList)
      } else {
        setError(data.error || "Login gagal");
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
        Login
      </h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={inputStyle}
        disabled={loading}
        onFocus={(e) => (e.target.style.borderColor = "#0d47a1")}
        onBlur={(e) => (e.target.style.borderColor = "#1565c0")}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ ...inputStyle, marginBottom: 30 }}
        disabled={loading}
        onFocus={(e) => (e.target.style.borderColor = "#0d47a1")}
        onBlur={(e) => (e.target.style.borderColor = "#1565c0")}
      />
      <button
        type="submit"
        style={{
          ...buttonStyle,
          backgroundColor: loading ? "#115293" : buttonStyle.backgroundColor,
          cursor: loading ? "not-allowed" : buttonStyle.cursor,
        }}
        disabled={loading}
        onMouseEnter={(e) =>
          !loading && (e.target.style.backgroundColor = "#0d3c75")
        }
        onMouseLeave={(e) =>
          !loading && (e.target.style.backgroundColor = "#1976d2")
        }
      >
        {loading ? "Memproses..." : "Masuk"}
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
    </form>
  );
}
