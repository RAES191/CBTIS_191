import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Registro de usuarios
export const register = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const insertQuery = "INSERT INTO users (`username`, `email`, `password`, `permissions`) VALUES (?)";
    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      "user"
    ];

    db.query(insertQuery, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

// Inicio de sesión de usuarios
export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);
    if (!checkPassword) return res.status(400).json("Wrong password or username!");

    const token = jwt.sign(
      { id: data[0].id, permissions: data[0].permissions },
      "secretkey"
    );

    const { password, ...others } = data[0];
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

// Obtener nombre de usuario por correo electrónico
export const getUserByEmail = (req, res) => {
  const q = "SELECT username FROM users WHERE email = ?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    return res.status(200).json(data[0]);
  });
};

// Cambiar el método EntradaMenu para recibir número de control en la URL
export const EntradaMenu = (req, res) => {
  const controlNumber = req.params.controlNumber;

  const q = "SELECT * FROM alumno1 WHERE no_control = ?";
  db.query(q, [controlNumber], (err, data) => {
    if (err) return res.status(500).json("Error en la base de datos.");
    if (data.length === 0) return res.status(404).json("Número de control no encontrado.");

    const { password, ...studentData } = data[0];
    res.status(200).json(studentData);
  });
};

// logs.js (nuevo archivo o existente donde manejes las rutas de logs)
export const logSearch = (req, res) => {
  const { controlNumber, timestamp, student_id, llego_tarde } = req.body;

  // Insertar la información directamente en la base de datos
  const insertQuery = `
    INSERT INTO credencial_registro (controlNumber, search_time, student_id, llego_tarde) 
    VALUES (?, ?, ?, ?)
  `;

  db.query(insertQuery, [controlNumber, timestamp, student_id, llego_tarde], (err, result) => {
    if (err) return res.status(500).json("Error al registrar la búsqueda.");
    return res.status(200).json("Búsqueda registrada exitosamente.");
  });
};


export const TotalStudents = (req, res) => {
  const query = 'SELECT COUNT(DISTINCT no_Control) AS total FROM alumno1';

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al contar estudiantes' });
    }
    const count = result[0].total;
    return res.status(200).json({ count }); // Devuelve la cantidad total de estudiantes
  });
};

export const TopStudents = (req, res) => {
  const { order } = req.query; // Recibe el tipo de orden desde el frontend (asc o desc)
  const query = `SELECT nombre, paterno, materno, promedio, foto FROM alumno1 ORDER BY promedio ${order === 'asc' ? 'ASC' : 'DESC'} LIMIT 3`;

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener el top de alumno1' });
    }
    return res.status(200).json(result); // Devuelve la lista de alumno1 ordenados
  });
};


export const TotalStudentsByGender = (req, res) => {
  const query = `
    SELECT 
      SUM(CASE WHEN sexo = 'M' THEN 1 ELSE 0 END) AS maleCount,
      SUM(CASE WHEN sexo = 'F' THEN 1 ELSE 0 END) AS femaleCount
    FROM (SELECT DISTINCT no_Control, sexo FROM alumno1) AS unique_students
  `;

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al contar estudiantes por género' });
    }
    const { maleCount, femaleCount } = result[0];
    return res.status(200).json({ maleCount, femaleCount }); // Devuelve la cantidad de estudiantes masculinos y femeninos
  });
};

// Cerrar sesión
export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out.");
};

export const getDailyLogs = (req, res) => {
  const { controlNumber } = req.params;
  const query = `
    SELECT 
      controlNumber,
      DATE(search_time) AS date,
      MIN(search_time) AS first_entry,
      MAX(search_time) AS last_exit
    FROM credencial_registro
    WHERE controlNumber = ?
    GROUP BY DATE(search_time)
    ORDER BY date DESC
  `;

  db.query(query, [controlNumber], (err, data) => {
    if (err) return res.status(500).json("Error al obtener registros diarios.");
    res.status(200).json(data);
  });
};
