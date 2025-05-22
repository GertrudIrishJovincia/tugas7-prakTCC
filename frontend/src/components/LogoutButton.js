import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // hapus token dari storage
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className="button is-danger">
      Logout
    </button>
  );
};

export default LogoutButton;
