import React, { useEffect, useState } from "react";
import { apiFetch, BASE_URL } from "../utils.js";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function UserList() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      const data = await apiFetch("/api/users");
      setNotes(data);
    } catch (err) {
      setError("Gagal memuat data catatan.");
    }
  }

  async function deleteNote(id) {
    if (!window.confirm("Yakin ingin menghapus catatan ini?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotes();
    } catch (err) {
      alert("Gagal menghapus catatan.");
    }
  }

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "40px auto",
        padding: 30,
        backgroundColor: "#fff",
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#1a237e",
      }}
    >
      {/* Tombol Tambah Catatan */}
      <div style={{ marginBottom: 20, textAlign: "right" }}>
        <Link
          to="/add"
          style={{
            padding: "8px 16px",
            backgroundColor: "#1976d2",
            color: "white",
            borderRadius: 6,
            fontWeight: "600",
            fontSize: 14,
            textDecoration: "none",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(25, 118, 210, 0.4)",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#115293")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#1976d2")}
        >
          Tambah Catatan
        </Link>
      </div>

      <h2 style={{ textAlign: "center", marginBottom: 25 }}>Daftar Catatan</h2>

      {error && (
        <p
          style={{
            color: "#b00020",
            fontWeight: "600",
            textAlign: "center",
            marginTop: 20,
          }}
        >
          {error}
        </p>
      )}

      {notes.length === 0 ? (
        <p
          style={{
            color: "#4a7023",
            fontWeight: "500",
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Tidak ada catatan.
        </p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
          {notes.map((note) => (
            <li
              key={note.id}
              style={{
                backgroundColor: "#f9f9f9",
                marginBottom: 15,
                padding: 20,
                borderRadius: 8,
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                position: "relative",
              }}
            >
              <h3
                style={{
                  margin: "0 0 8px 0",
                  color: "#1565c0",
                  fontWeight: "600",
                }}
              >
                {note.title}
              </h3>
              <small
                style={{
                  color: "#1565c0",
                  fontWeight: "500",
                }}
              >
                {new Date(note.date).toLocaleString()}
              </small>
              <p style={{ marginTop: 12, color: "#444" }}>{note.content}</p>

              <div
                style={{
                  position: "absolute",
                  top: 15,
                  right: 15,
                  display: "flex",
                  gap: 10,
                }}
              >
                <Link
                  to={`/edit/${note.id}`}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#1976d2",
                    color: "white",
                    borderRadius: 6,
                    fontWeight: "600",
                    fontSize: 14,
                    textDecoration: "none",
                    cursor: "pointer",
                    boxShadow: "0 2px 6px rgba(25, 118, 210, 0.4)",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#115293")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#1976d2")}
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteNote(note.id)}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#d32f2f",
                    color: "white",
                    border: "none",
                    borderRadius: 6,
                    fontWeight: "600",
                    fontSize: 14,
                    cursor: "pointer",
                    boxShadow: "0 2px 6px rgba(211, 47, 47, 0.4)",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#9a1b1b")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#d32f2f")}
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
