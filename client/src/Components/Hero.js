import React, { useEffect, useState } from "react";
import Alumno from "../Assets/alumno-picture.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate  } from "react-router-dom";
import "../Styles/Hero.css";

function Hero() {
  const navigate = useNavigate();
  const [goUp, setGoUp] = useState(false);

  const scrollToTop = () =>  {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookAppointmentClick = () => {
    navigate("/RegistroAlumnos");
  };

  useEffect(() => {
    const onPageScroll = () => {
      if (window.scrollY > 600) {
        setGoUp(true);
      } else {
        setGoUp(false);
      }
    };
    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);

  return (
    <div className="section-container">
      <div className="hero-section">
        <div className="text-section">
          <p className="text-headline">📖   La educación primero</p>
          <h2 className="text-title">
          Excelencia en Acción: Preparando Líderes
          </h2>
          <p className="text-descritpion">
          En nuestra escuela, impulsamos un aprendizaje práctico donde los estudiantes 
          combinan rigor analítico, curiosidad e imaginación para abordar desafíos 
          sociales. Ofrecemos excelencia en cinco especialidades, preparando a los 
          estudiantes para sobresalir en un futuro dinámico.

          </p>
          <button
            className="text-appointment-btn"
            type="button"
            onClick={handleBookAppointmentClick}
          >
            <FontAwesomeIcon icon={faCalendarCheck} /> Inscríbete ahora
          </button>
          <div className="text-stats">
            <div className="text-stats-container">
              <p>10 mil+</p>
              <p>Alumnos Titulado</p>
            </div>

            <div className="text-stats-container">
              <p>5</p>
              <p>Especialidades</p>
            </div>

            <div className="text-stats-container">
              <p>40+</p>
              <p>Años de Experiencia</p>
            </div>
          </div>
        </div>

        <div className="hero-image-section">
          <img className="hero-image1" src={Alumno} alt="Alumno" />
        </div>
      </div>

      <div
        onClick={scrollToTop}
        className={`scroll-up ${goUp ? "show-scroll" : ""}`}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
    </div>
  );
}

export default Hero;
