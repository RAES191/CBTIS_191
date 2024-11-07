import React, { useState, useEffect } from 'react';
import axios from 'axios';
import defaultProfilePic from '../../Assets/default_profile_picture.jpg';

const TopStudents = () => {
  const [students, setStudents] = useState([]);
  const [order, setOrder] = useState('desc'); // Orden por defecto descendente

  useEffect(() => {
    fetchTopStudents(order);
  }, [order]);

  const fetchTopStudents = async (order) => {
    try {
      const response = await axios.get(`http://localhost:8800/api/auth/top/students?order=${order}`);
      const data = response.data.map((student) => {
        if (student.foto) {
          const base64Image = btoa(
            new Uint8Array(student.foto.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
          );
          student.foto = `data:image/jpeg;base64,${base64Image}`;
        } else {
          student.foto = defaultProfilePic;
        }
        return student;
      });
      setStudents(data);
    } catch (error) {
      console.error('Error al obtener el top de alumnos:', error);
    }
  };

  const toggleOrder = () => {
    setOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const renderMedal = (index) => {
    switch (index) {
      case 0:
        return '🥇'; 
      case 1:
        return '🥈';
      case 2:
        return '🥉';
      default:
        return null;
    }
  };

  const formatPercentage = (grade) => {
    return `${grade * 10}%`;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
      <h2 style={{ marginLeft: '0px' }}>Top Alumnos</h2>
        <button onClick={toggleOrder} style={{ marginLeft: '2em' }}>
          Ordenar de {order === 'asc' ? 'menor a mayor' : 'mayor a menor'}
        </button>
      </div>
      <div style={{ margin: '20px 0' }}>
        {students.map((student, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <div style={{ position: 'relative' }}>
              <img 
                src={student.foto}
                style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
                alt="Profile" 
                className="profile-image" 
              />
              {index < 3 && (
                <div style={{ position: 'absolute', bottom: '0', right: '8px', fontSize: '24px' }}>
                  {renderMedal(index)}
                </div>
              )}
            </div>
            <div style={{ flex: '1' }}>
              <div>{`${student.nombre} ${student.paterno}`}</div>
              <div style={{ color: 'orange' }}>
                Promedio: {student.promedio ? formatPercentage(student.promedio) : 'Sin'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopStudents;
  