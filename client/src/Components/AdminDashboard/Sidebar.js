// src/components/Sidebar.js
import React from 'react';
import '../../Styles/Sidebar.css';
import { FaTachometerAlt, FaClipboardList, FaBullhorn, FaPaperPlane } from 'react-icons/fa'; // Importamos íconos
import { useNavigate, useLocation } from 'react-router-dom'; // Importamos useNavigate y useLocation

const Sidebar1 = () => {
  const navigate = useNavigate(); // Usamos useNavigate
  const location = useLocation(); // Usamos useLocation para obtener la ruta actual

  // Función para manejar la navegación
  const handleItemClick = (route) => {
    navigate(route); // Redirigimos a la ruta correspondiente
  };

  return (
    <div className="sidebar1">
      <nav>
        <ul>
          <li
            className={location.pathname === '/dashboard' ? 'active' : ''}
            onClick={() => handleItemClick('/dashboard')}
          >
            <FaTachometerAlt className='text' /> Dashboard
          </li>
          <li
            className={location.pathname === '/Dashboard/MenuEntrada' ? 'active' : ''}
            onClick={() => handleItemClick('/Dashboard/MenuEntrada')}
          >
            <FaClipboardList className='text' /> Panel de Entrada
          </li>
          <li
            className={location.pathname === '/Dashboard/Panel' ? 'active' : ''}
            onClick={() => handleItemClick('/Dashboard/Panel')}
          >
            <FaBullhorn className='text' /> Anuncios
          </li>
          <li
            className={location.pathname === '/enviar-anuncios' ? 'active' : ''}
            onClick={() => handleItemClick('/enviar-anuncios')}
          >
            <FaPaperPlane className='text' /> Enviar Anuncios
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar1;
