import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthCard from "./components/auth/AuthCard";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <div style={{ padding: 20 }}>
      {/* Logout button hanya tampil kalau sudah login */}
      {token && (
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          style={{
            padding: "10px 18px",
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: 6,
            fontWeight: "600",
            fontSize: 14,
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(25, 118, 210, 0.4)",
            marginBottom: 20,
          }}
        >
          Logout
        </button>
      )}

      <Routes>
        <Route
          path="/login"
          element={
            !token ? (
              <AuthCard onLoginSuccess={() => (window.location.href = "/")} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/"
          element={token ? <UserList /> : <Navigate to="/login" />}
        />

        <Route
          path="/add"
          element={token ? <AddUser /> : <Navigate to="/login" />}
        />

        <Route
          path="/edit/:id"
          element={token ? <EditUser /> : <Navigate to="/login" />}
        />

        {/* Redirect semua route lain */}
        <Route
          path="*"
          element={<Navigate to={token ? "/" : "/login"} />}
        />
      </Routes>
    </div>
  );
}