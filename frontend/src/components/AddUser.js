import React, { useState } from "react";
import { apiFetch } from "../utils.js";

export default function AddUser({ onAdded }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await apiFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ username, email }),
      });
      onAdded();
      setUsername("");
      setEmail("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Tambah Pengguna</h3>
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
      <button type="submit">Tambah</button>
      {error && <p style={{color:"red"}}>{error}</p>}
    </form>
  );
}
