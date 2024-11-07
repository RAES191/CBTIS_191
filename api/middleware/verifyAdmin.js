import jwt from "jsonwebtoken";
import { db } from "../connect.js";

export const verifyAdmin = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("You are not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "SELECT permissions FROM users WHERE id = ?";
    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);

      // Verificar si el usuario tiene permisos de administrador
      if (data[0].permissions !== "admin") {
        return res.status(403).json("You are not allowed to access this page!");
      }

      req.user = userInfo; // Si es admin, continuar
      next();
    });
  });
};
