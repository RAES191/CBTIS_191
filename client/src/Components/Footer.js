import React from "react";
import "../Styles/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-section">
      <div className="footer-container">
        <div className="ft-info">
          <div className="ft-info-p1">
            <p className="ft-title">
              CBTIS <span className="ft-sign">191</span>
            </p>
            <p className="ft-description">Habla hoy,</p>
            <p className="ft-description">Empieza mañana.</p>
          </div>
        </div>

        <div className="ft-list">
          <p className="ft-list-title">Especialidades</p>
          <ul className="ft-list-items">
            <li>
              <a href="#services">Administración de empresas</a>
            </li>
            <li>
              <a href="#services">Preparación de Alimentos</a>
            </li>
            <li>
              <a href="#services">Programación</a>
            </li>
            <li>
              <a href="#services">Enfermería</a>
            </li>
            <li>
              <a href="#services">Electricidad</a>
            </li>
          </ul>
        </div>

        <div className="ft-list" id="contact">
          <p className="ft-list-title">Comunícate con nosotros</p>
          <ul className="ft-list-items">
            <li>
              <a href="mailto:escuela@cbtis191.gob.mx">escuela@cbtis191.gob.mx</a>
            </li>
            <li>
              <a href="tel:+02254545252">+022 5454 5252</a>
            </li>
            <li>
              <a href="tel:+02223266232">+022 2326 6232</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="ft-copyright">
        <p>© 2024 CBTIS 191. Todos los derechos reservados.</p>
      </div>
    </div>
  );
}

export default Footer;
