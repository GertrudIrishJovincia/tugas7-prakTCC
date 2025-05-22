const User = require("../models/UserModel");

exports.getUsers = async (req, res) => {
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.error("GET notes error:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil data catatan." });
  }
};

exports.getUsersById = async (req, res) => {
  try {
    const note = await User.findOne({ where: { id: req.params.id } });
    if (!note) {
      return res.status(404).json({ error: "Catatan tidak ditemukan." });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("GET note by ID error:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil data catatan." });
  }
};

exports.createUser = async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).json({ message: "Catatan berhasil dibuat." });
  } catch (error) {
    console.error("Create note error:", error.message);
    res.status(500).json({ error: "Gagal membuat catatan." });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, { where: { id: req.params.id } });
    if (!updated) {
      return res.status(404).json({ error: "Catatan tidak ditemukan." });
    }
    res.status(200).json({ message: "Catatan berhasil diperbarui." });
  } catch (error) {
    console.error("Update note error:", error.message);
    res.status(500).json({ error: "Gagal memperbarui catatan." });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ error: "Catatan tidak ditemukan." });
    }
    res.status(200).json({ message: "Catatan berhasil dihapus." });
  } catch (error) {
    console.error("Delete note error:", error.message);
    res.status(500).json({ error: "Gagal menghapus catatan." });
  }
};
