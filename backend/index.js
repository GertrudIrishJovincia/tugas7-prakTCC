require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./config/Database"); // ⬅️ koneksi database
const authRoutes = require("./routes/AuthRoute");
const userRoutes = require("./routes/UserRoute");

const app = express();

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Routing
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Tes koneksi database
(async () => {
  try {
    await db.authenticate();
    console.log("✅ Database connected.");
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
  }
})();

// Jalankan server
const PORT = parseInt(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});