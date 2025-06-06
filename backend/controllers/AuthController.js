import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/Database.js";
import { QueryTypes } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username dan password wajib diisi" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO admin (username, password, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW())",
      {
        replacements: [username, hashedPassword],
        type: QueryTypes.INSERT,
      }
    );

    res.status(201).json({ message: "Registrasi user berhasil" });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      res.status(409).json({ error: "Username sudah digunakan, silakan coba username lain" });
    } else {
      res.status(500).json({ error: "Terjadi kesalahan server saat registrasi: " + err.message });
    }
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username dan password wajib diisi" });
  }

  try {
    const rows = await db.query(
      "SELECT * FROM admin WHERE username = ?",
      {
        replacements: [username],
        type: QueryTypes.SELECT,
      }
    );

    if (rows.length === 0)
      return res.status(404).json({ error: "User tidak ditemukan, silakan registrasi terlebih dahulu" });

    const valid = await bcrypt.compare(password, rows[0].password);
    if (!valid) return res.status(401).json({ error: "Password salah, silakan coba lagi" });

    const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    });

    res.json({ message: "Login berhasil", token });
  } catch (err) {
    res.status(500).json({ error: "Terjadi kesalahan server saat login: " + err.message });
  }
};

export const logout = (req, res) => {
  res.json({ message: "Logout berhasil, sesi berakhir" });
};
