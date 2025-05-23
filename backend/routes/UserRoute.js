const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/UserController");

const router = express.Router();

// ========== ROUTE UNTUK MANAJEMEN CATATAN ==========

// 📥 GET semua catatan (public)
router.get("/", getNotes);

// 🔎 GET satu catatan berdasarkan ID (public)
router.get("/:id", getNoteById);

// ➕ POST buat catatan baru (butuh login)
router.post("/", verifyToken, createNote);

// ✏️ PATCH update catatan berdasarkan ID (butuh login)
router.patch("/:id", verifyToken, updateNote);

// 🗑 DELETE hapus catatan berdasarkan ID (butuh login)
router.delete("/:id", verifyToken, deleteNote);

module.exports = router;
