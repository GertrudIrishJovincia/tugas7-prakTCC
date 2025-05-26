export default function AuthCard({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = (showLogin) => {
    setIsLogin(showLogin);
  };

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "40px auto",
        padding: 30,
        backgroundColor: "#ffffff",
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {isLogin ? (
        <>
          <LoginForm onLoginSuccess={onLoginSuccess} />
          <div
            style={{ marginTop: 20, textAlign: "center", cursor: "pointer" }}
            onClick={() => toggleForm(false)}
          >
            Belum punya akun?{" "}
            <span style={{ color: "#1565c0", textDecoration: "underline" }}>
              Daftar di sini
            </span>
          </div>
        </>
      ) : (
        <>
          <RegisterForm onRegisterSuccess={() => toggleForm(true)} />
          <div
            style={{ marginTop: 20, textAlign: "center", cursor: "pointer" }}
            onClick={() => toggleForm(true)}
          >
            Sudah punya akun?{" "}
            <span style={{ color: "#1565c0", textDecoration: "underline" }}>
              Login di sini
            </span>
          </div>
        </>
      )}
    </div>
  );
}
