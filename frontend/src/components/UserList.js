import React, { useEffect, useState } from "react";
import { apiFetch } from "../utils.js";

export default function UserList() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchNotes() {
      try {
        const data = await apiFetch("/api/users");
        setNotes(data);
      } catch (err) {
        setError("Gagal memuat data catatan.");
      }
    }
    fetchNotes();
  }, []);

  if (error)
    return (
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
    );

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "40px auto",
        padding: 30,
        backgroundColor: "#ffffff",
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#1a237e",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 25 }}>Daftar Catatan</h2>
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
        <ul
          style={{
            listStyleType: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {notes.map((note) => (
            <li
              key={note.id}
              style={{
                backgroundColor: "#f9f9f9",
                marginBottom: 15,
                padding: 20,
                borderRadius: 8,
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
