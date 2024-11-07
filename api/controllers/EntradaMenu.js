import { db } from "../connect.js";

// Obtener información del alumno por número de control, incluyendo los datos del tutor
export const getStudentByControlNumber = (req, res) => {
  const controlNumber = req.params.controlNumber;

  // Consulta para obtener la información del alumno y del tutor
  const query = `
  SELECT Carrera, Generacion, Turno, Semestre, Grupo, no_control, Nombre, 
         ApellidoPaterno, ApellidoMaterno, CURP 
  FROM alumno1 
  WHERE no_control = ?
  `;

  db.query(query, [controlNumber], (err, data) => {
    if (err) {
      console.error("Error en la base de datos:", err);
      return res.status(500).json({ error: "Error en la base de datos: " + err });
    }
    

    if (data.length === 0) {
      return res.status(404).json({ error: "Número de control no encontrado." }); // Mensaje de error más claro
    }

    const studentData = data[0];

    // Añadir la fecha y hora actual en formato ISO 8601 (UTC)
    studentData.fecha_busqueda = new Date().toISOString();

    return res.json(studentData); // Devolver los datos del alumno en formato JSON
  });
};
