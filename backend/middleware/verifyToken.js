import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifyToken = (req, res, next) => {
  console.log("Authorization header:", req.headers.authorization);
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Akses ditolak. Token tidak tersedia." });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Token tidak valid" });
  }
};

export default verifyToken;
