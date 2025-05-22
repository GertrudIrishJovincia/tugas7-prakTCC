import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Password dan konfirmasi password harus sama");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/register`, { username, password });
      alert("Registrasi berhasil, silakan login");
      navigate("/login");
    } catch (error) {
      setErrorMsg(error.response?.data?.error || "Registrasi gagal");
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-one-third">
        <form onSubmit={handleRegister}>
          <h1 className="title has-text-centered">Register</h1>
          {errorMsg && (
            <div className="notification is-danger">{errorMsg}</div>
          )}
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                type="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Confirm Password</label>
            <div className="control">
              <input
                type="password"
                className="input"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field mt-5">
            <button type="submit" className="button is-primary is-fullwidth">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
