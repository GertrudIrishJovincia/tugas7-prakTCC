import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const response = await axios.post(`${BASE_URL}/login`, { username, password });
      // Simpan token ke localStorage (atau state management)
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      setErrorMsg(error.response?.data?.error || "Login gagal");
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-one-third">
        <form onSubmit={handleLogin}>
          <h1 className="title has-text-centered">Login</h1>
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

          <div className="field mt-5">
            <button type="submit" className="button is-success is-fullwidth">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
