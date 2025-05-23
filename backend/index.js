import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/Database.js";
import authRoutes from "./routes/AuthRoute.js";
import userRoutes from "./routes/UserRoute.js";

dotenv.config();

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
