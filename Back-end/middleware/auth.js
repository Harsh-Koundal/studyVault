import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ msg: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach decoded data (like id, email, role)
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(401).json({ msg: "Invalid or expired token." });
  }
};
