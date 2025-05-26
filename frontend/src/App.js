import React, { useState, useEffect } from "react";
import AuthCard from "./components/auth/AuthCard";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import LogoutButton from "./components/LogoutButton";
import PrivateRoutes from "./components/PrivateRoutes";

const buttonStyle = {
  padding: "10px 18px",
  marginRight: 12,
  backgroundColor: "#1976d2",
  color: "white",
  border: "none",
  borderRadius: 6,
  fontWeight: "600",
  fontSize: 14,
  cursor: "pointer",
  boxShadow: "0 2px 6px rgba(25, 118, 210, 0.4)",
  transition: "background-color 0.3s ease",
};

const buttonHoverStyle = {
  backgroundColor: "#115293",
};

export default function App() {
  const [page, setPage] = useState("login"); // users, addUser, editUser, or auth (login/register)
  const [editingUserId, setEditingUserId] = useState(null);
  const [logoutHover, setLogoutHover] = useState(false);
  const [addHover, setAddHover] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setPage("users");
    else setPage("auth"); // pakai AuthCard
  }, []);

  const onLoginSuccess = () => setPage("users");
  const onLogout = () => {
    localStorage.removeItem("token");
    setPage("auth");
  };

  return (
    <div style={{ padding: 20 }}>
      {(page === "users" || page === "addUser" || page === "editUser") && (
        <>
          <button
            style={{ ...buttonStyle, ...(logoutHover ? buttonHoverStyle : {}) }}
            onMouseEnter={() => setLogoutHover(true)}
            onMouseLeave={() => setLogoutHover(false)}
            onClick={onLogout}
          >
            Logout
          </button>

          {page === "users" && (
            <button
              style={{ ...buttonStyle, ...(addHover ? buttonHoverStyle : {}) }}
              onMouseEnter={() => setAddHover(true)}
              onMouseLeave={() => setAddHover(false)}
              onClick={() => setPage("addUser")}
            >
              Tambah Catatan
            </button>
          )}
        </>
      )}

      {page === "auth" && <AuthCard onLoginSuccess={onLoginSuccess} />}

      <PrivateRoutes>
        {page === "users" && (
          <>
            <UserList />
          </>
        )}
        {page === "addUser" && (
          <>
            <button
              style={buttonStyle}
              onClick={() => setPage("users")}
            >
              Kembali
            </button>
            <AddUser onAdded={() => setPage("users")} />
          </>
        )}
        {page === "editUser" && editingUserId && (
          <>
            <button
              style={buttonStyle}
              onClick={() => setPage("users")}
            >
              Kembali
            </button>
            <EditUser userId={editingUserId} onUpdated={() => setPage("users")} />
          </>
        )}
      </PrivateRoutes>
    </div>
  );
}
