import express from "express";
import { login,register,logout,EntradaMenu, TotalStudents, TotalStudentsByGender, TopStudents, logSearch, getDailyLogs } from "../controllers/auth.js";

const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.post("/logout", logout)
router.get("/:controlNumber", EntradaMenu);
router.get("/count/students", TotalStudents);
router.get('/total-gender', TotalStudentsByGender);
router.get('/count/students/gender', TotalStudentsByGender); // Agrega esta línea
router.get('/top/students', TopStudents); // Agrega esta línea
router.post('/logSearch', logSearch);
router.get("/logs/:controlNumber", getDailyLogs);

export default router