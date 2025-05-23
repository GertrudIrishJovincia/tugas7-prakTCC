import express from "express";
import {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/UserController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// Semua route ini butuh verifikasi token (autentikasi)
router.use(verifyToken);

router.get("/", getNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.patch("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
