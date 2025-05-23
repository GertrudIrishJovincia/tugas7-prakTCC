import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";

const User = db.define(
  "users",
  {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Judul tidak boleh kosong" },
        len: { args: [2, 255], msg: "Judul harus antara 2–255 karakter" },
      },
    },
    content: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Isi catatan tidak boleh kosong" },
        len: { args: [5, 1000], msg: "Isi catatan harus antara 5–1000 karakter" },
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: true, // akan otomatis isi createdAt & updatedAt
  }
);

// Catatan: Jalankan sync ini hanya saat development (jangan di production)
if (process.env.NODE_ENV !== "production") {
  (async () => {
    try {
      await db.sync(); // pakai { alter: true } kalau mau update struktur
      console.log("✅ users table synced");
    } catch (err) {
      console.error("❌ Sync error:", err);
    }
  })();
}

export default User;