import express from "express";
import { verifyAdmin } from "../middleware/verifyAdmin.js"; // Importar el middleware

const router = express.Router();

router.get("/menu", verifyAdmin, (req, res) => {
  res.status(200).json("Welcome to the admin menu page!");
});

export default router;
