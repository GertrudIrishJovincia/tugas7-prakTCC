import React, { useState, useEffect } from "react";
import { apiFetch } from "../utils.js";

export default function EditUser({ userId, onUpdated }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await apiFetch(`/api/users/${userId}`);
        setUsername(data.username);
        setEmail(data.email);
      } catch {
        setError("Gagal memuat data user");
      }
    }
    loadUser();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await apiFetch(`/api/users/${userId}`, {
        method: "PATCH",
        body: JSON.stringify({ username, email }),
      });
      onUpdated();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Pengguna</h3>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      /><br/>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      /><br/>
      <button type="submit">Simpan</button>
      {error && <p style={{color:"red"}}>{error}</p>}
    </form>
  );
}
