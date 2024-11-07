import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import axios from 'axios'; // Asegúrate de tener axios instalado
import Chart from 'chart.js/auto';

const Charts = () => {
  const [studentsCount, setStudentsCount] = useState(0);
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);

  const managementValueData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Earning',
        data: [30, 70, 50, 80, 40, 90],
        borderColor: 'orange',
        fill: false,
      },
      {
        label: 'Absent',
        data: [20, 30, 40, 20, 30, 40],
        borderColor: 'purple',
        fill: false,
      },
      {
        label: 'Present',
        data: [70, 60, 70, 90, 50, 70],
        borderColor: 'blue',
        fill: false,
      },
    ],
  };
  
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

    const fetchGenderCount = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/auth/count/students/gender`);
        setMaleCount(response.data.maleCount); // Actualiza el estado con el conteo de estudiantes masculinos
        setFemaleCount(response.data.femaleCount); // Actualiza el estado con el conteo de estudiantes femeninos
      } catch (error) {
        console.error("Error al obtener el conteo de género:", error);
      }
    };
    
    fetchGenderCount();
    fetchStudentCount();

    // Si también necesitas obtener el número de profesores, aquí puedes hacer otra llamada similar
    // setTeachersCount(102); // Valor simulado para el número de profesores

  }, []);
  
// Supón que `totalStudents` es el total único de estudiantes que obtuviste de la consulta
const totalStudents = studentsCount; // Cambia este valor con el total único de estudiantes únicos

// Calcula `undefinedCount` si existen alumnos con género no especificado
const undefinedCount = totalStudents - (maleCount + femaleCount); // Esto asume que algunos pueden no tener género definido

// Calcula los porcentajes
const malePercentage = ((maleCount / totalStudents) * 100).toFixed(2);
const femalePercentage = ((femaleCount / totalStudents) * 100).toFixed(2);
const undefinedPercentage = ((undefinedCount / studentsCount) * 100).toFixed(2);

// Genera los datos para la distribución de género
const genderDistributionData = {
  labels: ['Male', 'Female', 'Sin Sexo'],
  datasets: [
    {
      data: [
        malePercentage, // Porcentaje de hombres
        femalePercentage, // Porcentaje de mujeres
        undefinedPercentage, // Porcentaje de Sin Sexo
      ],
      backgroundColor: ['orange', '#00bfff', '#d3d3d3'],
    },
  ],
};


  const genderDistributionOptions = {
    plugins: {
      legend: {
        display: false, // Oculta completamente la leyenda y los botones
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`; // Muestra el valor porcentual en los tooltips
          },
        },
      },
    },
  };
  

  return (
    <div className="charts">
      <h3>Management Value</h3>
      <div className="management-chart-container">
        <div className="management-value-chart">
          <Line data={managementValueData} />
        </div>
        <div className="gender-distribution-chart">
          <Pie data={genderDistributionData} options={genderDistributionOptions} />
          <div className="legend" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <p style={{ marginRight: '6px', marginTop: '8px' }}>
              <span style={{ color: 'orange' }}>●</span> Hombres:   <strong>{maleCount}</strong>
            </p>
            <p style={{ marginRight: '6px', marginTop: '8px' }}>
              <span style={{ color: '#00bfff' }}>●</span> Mujeres:   <strong>{femaleCount}</strong>
            </p>
            <p style={{ marginTop: '8px' }}>
              <span style={{ color: '#d3d3d3' }}>●</span> Sin:   <strong>{undefinedCount}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
