import { db } from "../connect.js";
import jwt from "jsonwebtoken";

// Obtener información del usuario
export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id=?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];
    return res.json(info);
  });
};

// Actualizar información del usuario
export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    // Solo el usuario o un administrador puede actualizar el perfil
    const q = userInfo.permissions === "admin"
      ? "UPDATE users SET `name`=?,`city`=?,`website`=?,`profilePic`=?,`coverPic`=? WHERE id=?"
      : "UPDATE users SET `name`=?,`city`=?,`website`=?,`profilePic`=?,`coverPic`=? WHERE id=? AND id=?"; // Solo permite actualizar si el ID es del mismo usuario

    const queryParams = userInfo.permissions === "admin"
      ? [req.body.name, req.body.city, req.body.website, req.body.profilePic, req.body.coverPic, req.params.userId] // Para admin, puede actualizar cualquier perfil
      : [req.body.name, req.body.city, req.body.website, req.body.profilePic, req.body.coverPic, userInfo.id, userInfo.id]; // Para usuarios normales, solo pueden actualizar su propio perfil

    db.query(q, queryParams, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.json("Updated!");
      return res.status(403).json("You can update only your profile!");
    });
  });
};
