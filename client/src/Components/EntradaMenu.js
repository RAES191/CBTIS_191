import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../Styles/StudentSearch.css";
import defaultProfilePicture from '../Assets/default_profile_picture.jpg';
import Sidebar from './AdminDashboard/Sidebar';
import alertSound from '../Assets/alert_sound.mp3';
import Entrada from './AdminDashboard/Entrada';

function StudentSearch() {
  const [controlNumber, setControlNumber] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("success");
  const [showStatusBox, setShowStatusBox] = useState(false);
  const [loadingWidth, setLoadingWidth] = useState(100);
  const [username, setUsername] = useState("");
  const [isLate, setIsLate] = useState(false); // Nuevo estado para llegada tarde
  const intervalRef = useRef(null);
  const inputRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

  useEffect(() => inputRef.current.focus(), []);

  const playAlertSound = () => {
    if (audioRef.current) audioRef.current.play();
  };

  const getFormattedDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const logSearch = (controlNumber, studentId) => {
    const now = new Date();
    const llegadaTarde = now.getHours() > 8 || (now.getHours() === 8 && now.getMinutes() >= 11);
    setIsLate(llegadaTarde); // Actualiza el estado de llegada tarde

    const searchData = {
      controlNumber,
      student_id: studentId,
      timestamp: getFormattedDate(),
      llego_tarde: llegadaTarde,
    };

    axios.post(`http://localhost:8800/api/auth/logSearch`, searchData)
      .then((response) => {
        console.log("Búsqueda registrada:", response.data);
        // Configurar el mensaje si llegó tarde
      if (llegadaTarde) {
        setStatus("Llegó tarde.");
        setStatusType("error"); // Cambia el recuadro de estado a rojo
      } else {
        setStatus("Llegada registrada a tiempo.");
        setStatusType("success"); // Verde para registro a tiempo
      }
      setShowStatusBox(true); // Mostrar el recuadro de estado
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setError("Esta credencial ya entró a la escuela entre 7:00 AM y 10:00 AM.");
          playAlertSound();
        } else {
          console.error("Error al registrar la búsqueda:", error);
          setError("Ocurrió un error al registrar la búsqueda.");
        }
      });
  };

  const searchStudent = (controlNumber) => {
    if (controlNumber.length === 0) {
      alert("¡El número de control no puede estar en blanco!");
      return;
    }

    setStatus("Buscando...");
    setStatusType("success");
    setShowStatusBox(true);
    setLoadingWidth(100);

    axios.get(`http://localhost:8800/api/auth/${controlNumber}`)
      .then((response) => {
        if (response.data) {
          const data = response.data;
          data.fecha_busqueda_local = new Date().toLocaleString();
          logSearch(controlNumber, data.id);

          if (data.foto) {
            const base64Image = btoa(
              new Uint8Array(data.foto.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
            );
            data.foto = `data:image/jpeg;base64,${base64Image}`;
          }

          setStudentData(data);
          setError("");

          setTimeout(() => {
            setControlNumber("");
            setStudentData(null);
            setStatus("");
            setShowStatusBox(false);
          }, 4500);
        } else {
          setError("Número de control no encontrado.");
          playAlertSound();
          setStudentData(null);
          setStatus("Error en la búsqueda.");
          setStatusType("error");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setError("Número de control no encontrado.");
        } else {
          setError("Ocurrió un error en la búsqueda.");
        }
        playAlertSound();
        setStatus("Error en la búsqueda.");
        setStatusType("error");
        setStudentData(null);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchStudent(controlNumber);
  };

  useEffect(() => {
    if (showStatusBox) {
      intervalRef.current = setInterval(() => {
        setLoadingWidth((prev) => {
          if (prev > 0) return prev - 1;
          clearInterval(intervalRef.current);
          setShowStatusBox(false);
          return 0;
        });
      }, 50);
    }
    return () => clearInterval(intervalRef.current);
  }, [showStatusBox]);

  const handleMouseEnter = () => clearInterval(intervalRef.current);
  const handleMouseLeave = () => {
    intervalRef.current = setInterval(() => {
      setLoadingWidth((prev) => {
        if (prev > 0) return prev - 1;
        clearInterval(intervalRef.current);
        setShowStatusBox(false);
        return 0;
      });
    }, 50);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        {/* Buscar Alumno - Ocupa todo el ancho */}
        <div className="search-section">
          <form className="search__form" onSubmit={handleSubmit}>
            <h1 className="search__title">Buscar Alumno</h1>
            <div className="search__box">
              <input
                type="text"
                placeholder="Número de Control"
                className="search__input"
                value={controlNumber}
                onChange={(e) => setControlNumber(e.target.value)}
                ref={inputRef}
                required
              />
            </div>
            {error && <div className="search__error">{error}</div>}
            {studentData ? (
              <div className="profile">
                <img 
                  src={studentData.foto ? studentData.foto : defaultProfilePicture} 
                  alt="Profile" 
                  className="profile-image" 
                />
                <h2>{studentData.nombre} {studentData.paterno}</h2>
                <ul>
                  <li><span><strong>Grupo:</strong></span> {studentData.grupo}</li>
                  <li><span><strong>Carrera:</strong></span> {studentData.carrera}</li>
                  <li><span><strong>Fecha y Hora de Búsqueda:</strong></span> {studentData.fecha_busqueda_local}</li>
                </ul>
              </div>
            ) : (
              <div className="profile">
                <h2>Busque un alumno</h2>
              </div>
            )}
          </form>
        </div>
  
        {/* Registro de Entrada y Salida - Ocupa todo el ancho */}
        <div className="entrada-section">
          <Entrada />
        </div>
      </main>
  
      {showStatusBox && (
        <div
          className={`status-box ${statusType}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="status-content">
            <p>{status}</p>
          </div>
          <div className="loading-bar-container">
            <div className="loading-bar" style={{ width: `${loadingWidth}%` }}></div>
          </div>
        </div>
      )}
  
      <audio ref={audioRef} src={alertSound} style={{ display: 'none' }} />
    </div>
  );
  
}

export default StudentSearch;
