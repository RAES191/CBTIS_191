import React, { useState, useEffect } from 'react';
import '../../Styles/Dashboard.css'; // Importa tus estilos personalizados
import StudentStats from './StudentStats';
import Charts from './Charts';
import TopStudents from './TopStudents';
import axios from 'axios'; // Asegúrate de tener axios instalado
import Chart from 'chart.js/auto';
import Sidebar from './Sidebar'

const Dashboard = () => {
  const [studentsCount, setStudentsCount] = useState(0);
  const [teachersCount, setTeachersCount] = useState(0);

  useEffect(() => {
    // Llamada a la API para obtener el número de estudiantes
    const fetchStudentCount = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/auth/count/students`);
        setStudentsCount(response.data.count); // Actualiza el estado con el número de estudiantes
      } catch (error) {
        console.error("Error al obtener la cantidad de estudiantes:", error);
      }
    };

    fetchStudentCount();

    // Si también necesitas obtener el número de profesores, aquí puedes hacer otra llamada similar
    // setTeachersCount(102); // Valor simulado para el número de profesores

  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <header className="header">
        <h1 className="dashboard-title">Dashboard</h1>
          <p className="school-management">School Management</p>
        </header>
        
        
        <div className="stats-section">
        <StudentStats students={studentsCount} teachers={teachersCount} />
      </div>
        
        <div className="charts-section">
          <Charts />
        </div>

        <div className="top-students-section">
          <TopStudents />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
  