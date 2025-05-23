const User = require("../models/UserModel");

// Ambil semua catatan (note)
exports.getNotes = async (req, res) => {
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.error("GET notes error:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil data catatan." });
  }
};

// Ambil catatan berdasarkan ID
exports.getNoteById = async (req, res) => {
  try {
    const note = await User.findOne({ where: { id: req.params.id } });
    if (!note) {
      return res.status(404).json({ error: "Catatan tidak ditemukan." });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("GET note by ID error:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil data catatan." });
  }
};

// Tambah catatan baru
exports.createNote = async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).json({ message: "Catatan berhasil dibuat." });
  } catch (error) {
    console.error("Create note error:", error);
    res.status(500).json({ error: "Gagal membuat catatan." });
  }
};

// Update catatan berdasarkan ID
exports.updateNote = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, { where: { id: req.params.id } });
    if (!updated) {
      return res.status(404).json({ error: "Catatan tidak ditemukan." });
    }
    res.status(200).json({ message: "Catatan berhasil diperbarui." });
  } catch (error) {
    console.error("Update note error:", error);
    res.status(500).json({ error: "Gagal memperbarui catatan." });
  }
};

// Hapus catatan berdasarkan ID
exports.deleteNote = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ error: "Catatan tidak ditemukan." });
    }
    res.status(200).json({ message: "Catatan berhasil dihapus." });
  } catch (error) {
    console.error("Delete note error:", error);
    res.status(500).json({ error: "Gagal menghapus catatan." });
  }
};
