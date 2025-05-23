require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./config/Database");
const authRoutes = require("./routes/AuthRoute");
const userRoutes = require("./routes/UserRoute");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

(async () => {
  try {
    await db.authenticate();
    console.log("✅ Database connected.");
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
  }
})();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});