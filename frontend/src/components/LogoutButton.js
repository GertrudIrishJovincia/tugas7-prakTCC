import React from "react";

export default function LogoutButton({ onLogout }) {
  return (
    <button onClick={() => {
      localStorage.removeItem("token");
      onLogout();
    }}>
      Logout
    </button>
  );
}
