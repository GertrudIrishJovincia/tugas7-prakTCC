import React, { useState } from "react";
import LoginForm from "./components/LoginForm.js";
import RegisterForm from "./components/RegisterForm.js";
import UserList from "./components/UserList.js";
import AddUser from "./components/AddUser.js";
import EditUser from "./components/EditUser.js";
import LogoutButton from "./components/LogoutButton.js";
import PrivateRoutes from "./components/PrivateRoutes.js";

export default function App() {
  const [page, setPage] = useState("login"); // login, register, users, addUser, editUser
  const [editingUserId, setEditingUserId] = useState(null);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setPage("users");
  }, []);

  const onLoginSuccess = () => setPage("users");
  const onLogout = () => {
    localStorage.removeItem("token");
    setPage("login");
  };
  const onRegisterSuccess = () => setPage("login");

  return (
    <div style={{ padding: 20 }}>
      {(page === "users" ||
        page === "addUser" ||
        page === "editUser") && <LogoutButton onLogout={onLogout} />}

      {page === "login" && <LoginForm onLoginSuccess={onLoginSuccess} />}
      {page === "register" && <RegisterForm onRegisterSuccess={onRegisterSuccess} />}
      <PrivateRoutes>
        {page === "users" && (
          <>
            <button onClick={() => setPage("addUser")}>Tambah Pengguna</button>
            <UserList />
          </>
        )}
        {page === "addUser" && (
          <>
            <button onClick={() => setPage("users")}>Kembali</button>
            <AddUser onAdded={() => setPage("users")} />
          </>
        )}
        {page === "editUser" && editingUserId && (
          <>
            <button onClick={() => setPage("users")}>Kembali</button>
            <EditUser userId={editingUserId} onUpdated={() => setPage("users")} />
          </>
        )}
      </PrivateRoutes>

      {page !== "users" && page !== "addUser" && page !== "editUser" && (
        <p style={{ marginTop: 20 }}>
          {page === "login" ? (
            <>
              Belum punya akun?{" "}
              <span
                onClick={() => setPage("register")}
                style={{ color: "blue", cursor: "pointer" }}
              >
                Daftar di sini
              </span>
            </>
          ) : (
            <>
              Sudah punya akun?{" "}
              <span
                onClick={() => setPage("login")}
                style={{ color: "blue", cursor: "pointer" }}
              >
                Login di sini
              </span>
            </>
          )}
        </p>
      )}
    </div>
  );
}
