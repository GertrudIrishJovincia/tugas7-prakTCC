import React from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import AuthCard from "./components/auth/AuthCard";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";

function AppContent() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  // Tampilkan tombol Kembali hanya jika user sudah login dan path bukan "/"
  const showBackButton = token && location.pathname !== "/";

  return (
    <div style={{ padding: 20 }}>
      {token && (
        <div style={{ marginBottom: 20, display: "flex", gap: 12 }}>
          {showBackButton && (
            <button
              onClick={() => navigate(-1)}
              style={{
                padding: "10px 18px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: 6,
                fontWeight: "600",
                fontSize: 14,
                cursor: "pointer",
                boxShadow: "0 2px 6px rgba(108, 117, 125, 0.4)",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#565e64")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#6c757d")}
            >
              Kembali
            </button>
          )}

          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
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
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#115293")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#1976d2")}
          >
            Logout
          </button>
        </div>
      )}

      <Routes>
        <Route
          path="/login"
          element={!token ? <AuthCard onLoginSuccess={() => navigate("/")} /> : <Navigate to="/" />}
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
        <Route
          path="*"
          element={<Navigate to={token ? "/" : "/login"} />}
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
