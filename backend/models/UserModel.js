import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";

const User = db.define(
  "users",
  {
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Title tidak boleh kosong" },
        len: { args: [2, 255], msg: "Title harus 2-255 karakter" },
      },
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Content tidak boleh kosong" },
        len: { args: [5, 1000], msg: "Content harus 5-1000 karakter" },
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

(async () => {
  try {
    await db.sync();
    console.log("✅ User table synced");
  } catch (err) {
    console.error("❌ Sync error:", err.message);
  }
})();

export default User;