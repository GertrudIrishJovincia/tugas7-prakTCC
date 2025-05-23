const User = require("../models/UserModel");

// Ambil semua catatan
exports.getNotes = async (req, res) => {
  try {
    const notes = await User.findAll({ order: [["createdAt", "DESC"]] });
    res.status(200).json(notes);
  } catch (error) {
    console.error("GET notes error:", error.message);
    console.error("FULL ERROR OBJECT:", error);
    console.error("STACK TRACE:", error.stack);
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
    const { date, title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Judul dan isi catatan wajib diisi." });
    }

    const newNote = await User.create({ date, title, content });
    res.status(201).json({ message: "Catatan berhasil dibuat.", note: newNote });
  } catch (error) {
    console.error("Create note error:", error);
    res.status(500).json({ error: "Gagal membuat catatan." });
  }
};

// Update catatan berdasarkan ID
exports.updateNote = async (req, res) => {
  try {
    const { date, title, content } = req.body;

    const [updated] = await User.update(
      { date, title, content },
      { where: { id: req.params.id } }
    );

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