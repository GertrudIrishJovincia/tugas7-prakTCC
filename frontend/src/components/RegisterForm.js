import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";
import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setMessage("Password dan konfirmasi password harus sama");
      setIsError(true);
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/register`, {
        username: formData.username,
        password: formData.password,
      });
      if (res.status === 201) {
        setMessage("Registrasi berhasil! Mengarahkan ke login...");
        setIsError(false);
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      setMessage(err.response?.data?.error || "Registrasi gagal");
      setIsError(true);
    }
  };

  return (
    <div className="container mt-6">
      <div className="column is-half is-offset-one-quarter">
        <div className="box p-5">
          <h2 className="title is-3 has-text-centered has-text-info">
            <i className="fas fa-user-plus mr-2"></i> Daftar Admin Baru
          </h2>

          {message && (
            <div className={`notification ${isError ? "is-danger" : "is-success"}`}>{message}</div>
          )}

          <form onSubmit={handleRegister}>
            <div className="field">
              <label className="label">Username</label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Masukkan username"
                  required
                  autoFocus
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user-circle"></i>
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Masukkan password"
                  required
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label">Confirm Password</label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Konfirmasi password"
                  required
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
            </div>

            <div className="field mt-5">
              <button type="submit" className="button is-info is-fullwidth">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;