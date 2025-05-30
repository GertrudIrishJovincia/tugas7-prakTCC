import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiFetch } from "../utils.js";

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

export default function EditUser() {
  const { id: noteId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadNote() {
      try {
        const data = await apiFetch(`/api/users/${noteId}`);
        setTitle(data.title);
        setContent(data.content);
      } catch {
        setError("Gagal memuat data catatan");
      }
    }
    loadNote();
  }, [noteId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await apiFetch(`/api/users/${noteId}`, {
        method: "PATCH",
        body: JSON.stringify({ title, content }),
      });
      navigate("/"); // kembali ke list setelah update berhasil
    } catch (err) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 480,
        margin: "40px auto",
        padding: 30,
        backgroundColor: "#ffffff",
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h3 style={{ color: "#1a237e", textAlign: "center", marginBottom: 25 }}>
        Edit Catatan
      </h3>
      <input
        placeholder="Judul"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={inputStyle}
        disabled={loading}
        onFocus={(e) => (e.target.style.borderColor = "#0d47a1")}
        onBlur={(e) => (e.target.style.borderColor = "#1565c0")}
      />
      <textarea
        placeholder="Isi catatan"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        style={{
          ...inputStyle,
          height: 120,
          resize: "vertical",
          marginBottom: 30,
        }}
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
        onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = "#115293")}
        onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = "#1976d2")}
      >
        {loading ? "Menyimpan..." : "Simpan"}
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
