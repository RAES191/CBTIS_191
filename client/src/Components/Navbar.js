import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faBars,
  faXmark,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import "../Styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/authContext"; // Importar el AuthContext

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);
  const { currentUser, logout } = useContext(AuthContext); // Usar el contexto
  const navigate = useNavigate();

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const [nav, setNav] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const openNav = () => {
    setNav(!nav);
  };

  const handleChatBtnClick = () => {
    if (!isButtonDisabled) {
      toast.info("Experiencing high traffic, Please wait a moment.", {
        position: toast.POSITION.TOP_CENTER,
        onOpen: () => setIsButtonDisabled(true),
        onClose: () => setIsButtonDisabled(false),
      });
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.log("Logout failed with error:", err);
    }
  };

  // Verificar si el usuario es admin
  const isAdmin = currentUser && currentUser.permissions === 'admin';

  return (
    <div className="navbar-section">
      <h1 className="navbar-title">
        <Link to="/">CBTIS <span className="navbar-sign">191</span></Link>
      </h1>

      {/* Desktop Navbar */}
      <ul className="navbar-items">
        <li><Link to="/" className="navbar-links">Principal</Link></li>
        <li><a href="#services" className="navbar-links">Especialidades</a></li>

        {/* Mostrar "Inscríbete" solo si el usuario está autenticado */}
        {currentUser && (
          <li><a href="#reviews" className="navbar-links">Inscríbete</a></li>
        )}

        {/* Mostrar el enlace al "Menu" solo si el usuario es admin */}
        {currentUser && currentUser.permissions === 'admin' && (
          <li><Link to="/menu" className="navbar-links">Menu</Link></li>
        )}

        {/* Mostrar "Panel" solo si el usuario está autenticado */}
        {currentUser && currentUser.permissions === 'admin'&& (
          <li><Link to="/Dashboard" className="navbar-links">Dashboard</Link></li>
        )}
        {/* Mostrar "Logout" solo si el usuario está autenticado */}
        {currentUser && (
          <li>
            <button onClick={handleLogout} className="navbar-links logout-button">
              <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
          </li>
        )}

        {/* Mostrar botón de "Regístrate" si el usuario no ha iniciado sesión */}
        {!currentUser && (
          <li>
            <Link to="/login" className="navbar-links">Regístrate</Link>
          </li>
        )}
      </ul>

      {/* Mobile Navbar */}
      <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
        <div onClick={openNav} className="mobile-navbar-close">
          <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
        </div>

        <ul className="mobile-navbar-links">
          <li>
            <Link onClick={openNav} to="/">
              Home
            </Link>
          </li>
          <li>
            <a onClick={openNav} href="#services">
              Services
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#about">
              About
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#reviews">
              Reviews
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#doctors">
              Doctors
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#contact">
              Contact
            </a>
          </li>
          {currentUser ? (
            <>
              <li>
                <Link onClick={openNav} to="/perfil">
                  Perfil
                </Link>
              </li>
              <li>
                <a onClick={openNav} href="#reviews">
                  Inscríbete
                </a>
              </li>
              {isAdmin && (
                <li>
                  <Link onClick={openNav} to="/menu">
                    Menu
                  </Link>
                </li>
              )}
              <li>
                <button onClick={(e) => { openNav(); handleLogout(e); }} className="logout-button">
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link onClick={openNav} to="/login">
                Regístrate
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Icono de hamburguesa */}
      <div className="mobile-nav">
        <FontAwesomeIcon
          icon={faBars}
          onClick={openNav}
          className="hamb-icon"
        />
      </div>
    </div>
  );
}

export default Navbar;
