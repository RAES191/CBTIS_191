import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Perfil.css";
import axios from "axios";

function Perfil() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener el estado de inicio de sesión del localStorage
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // Si el usuario no ha iniciado sesión, redirigirlo al login
    if (!isLoggedIn) {
      // Redirigir al usuario a la página de inicio de sesión
      navigate('/login');
    } else {
      // Obtener los datos del usuario desde el backend
      obtenerDatosUsuario();
    }
  }, [navigate]);

  const obtenerDatosUsuario = () => {
    // Realizar una solicitud al backend para obtener los datos del usuario
    axios.get("http://localhost/test/ObtenerDatos_usuario.php")
        .then(response => {
            // Actualizar el estado con los datos del usuario
            setUserData(response.data);
        })
        .catch(error => {
            setError("Error al obtener los datos del usuario.");
            console.error("Error al obtener los datos del usuario:", error);
        });
  };

  return (
    <div className="perfil-container">
      <h1 className="perfil-title">Perfil de Usuario</h1>
      {userData ? (
        <div className="perfil-info">
          <div className="perfil-item">
            <label className="perfil-label">Nombre de Usuario:</label>
            <span className="perfil-value">{userData.username}</span>
          </div>
          <div className="perfil-item">
            <label className="perfil-label">Correo Electrónico:</label>
            <span className="perfil-value">{userData.email}</span>
          </div>
          {/* Otros datos del usuario... */}
        </div>
      ) : (
        <p>Cargando...</p>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default Perfil;
