import React, { useEffect, useState } from "react";
import { apiFetch } from "../utils.js";

export default function UserList() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchNotes() {
      try {
        const data = await apiFetch("/api/users"); // endpoint backend yang mengembalikan catatan
        setNotes(data);
      } catch (err) {
        setError("Gagal memuat data catatan.");
      }
    }
    fetchNotes();
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ backgroundColor: "#a8e063", padding: 20, borderRadius: 10 }}>
      <h2 style={{ color: "#4a7023" }}>Daftar Catatan</h2>
      {notes.length === 0 ? (
        <p style={{ color: "#2e4600" }}>Tidak ada catatan.</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {notes.map((note) => (
            <li
              key={note.id}
              style={{
                backgroundColor: "#e9f7d5",
                marginBottom: 12,
                padding: 15,
                borderRadius: 8,
                boxShadow: "0 0 6px #a8e063aa",
              }}
            >
              <h3 style={{ margin: "0 0 6px 0", color: "#3a5f0b" }}>{note.title}</h3>
              <small style={{ color: "#4a7023" }}>
                {new Date(note.date).toLocaleString()}
              </small>
              <p style={{ marginTop: 8, color: "#2e4600" }}>{note.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
