import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Entrada = () => {
  const [selectedControlNumber, setSelectedControlNumber] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  // Obtener registros de entrada/salida por número de control
  const fetchAttendanceRecords = async (controlNumber) => {
    try {
      const response = await axios.get(`http://localhost:8800/api/auth/logs/${controlNumber}`);
      const records = response.data;

      // Filtrar solo el primer y último registro de cada día
      const filteredRecords = records.reduce((acc, record) => {
        const date = new Date(record.first_entry).toLocaleDateString();

        if (!acc[date]) acc[date] = { first: record.first_entry, last: record.last_exit };
        else {
          if (new Date(record.first_entry) < new Date(acc[date].first)) acc[date].first = record.first_entry;
          if (new Date(record.last_exit) > new Date(acc[date].last)) acc[date].last = record.last_exit;
        }
        
        return acc;
      }, {});

      // Convertir el objeto de fechas en un array para mostrar en la tabla
      const formattedRecords = Object.keys(filteredRecords).map((date) => ({
        date,
        firstEntry: filteredRecords[date].first,
        lastExit: filteredRecords[date].last,
      }));

      setAttendanceRecords(formattedRecords);
    } catch (error) {
      console.error('Error al obtener registros de asistencia:', error);
    }
  };

  // Manejar el cambio en la caja de texto del número de control
  const handleControlNumberChange = (e) => {
    const controlNumber = e.target.value;
    setSelectedControlNumber(controlNumber);
    if (controlNumber) fetchAttendanceRecords(controlNumber);
    else setAttendanceRecords([]);
  };

  return (
    <div>
      <h2>Registro de Entrada y Salida</h2>

      {/* Caja de texto para el número de control */}
      <div style={{ marginBottom: '20px' }}>
        <label>Ingresa el Número de Control:</label>
        <input
          type="text"
          value={selectedControlNumber}
          onChange={handleControlNumberChange}
          placeholder="Número de Control"
        />
      </div>

      {/* Tabla de registros de asistencia */}
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Primera Entrada</th>
            <th>Última Salida</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.length > 0 ? (
            attendanceRecords.map((record, index) => (
              <tr key={index}>
                <td>{record.date}</td>
                <td>{new Date(record.firstEntry).toLocaleTimeString()}</td>
                <td>{new Date(record.lastExit).toLocaleTimeString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Ingresa un número de control para ver los registros</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Entrada;
