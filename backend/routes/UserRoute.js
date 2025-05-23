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

// ---------- PUBLIC ----------
router.get("/", getNotes);
router.get("/:id", getNoteById);

// ---------- PROTECTED ----------
router.post("/", verifyToken, createNote);
router.patch("/:id", verifyToken, updateNote);
router.delete("/:id", verifyToken, deleteNote);

module.exports = router;
