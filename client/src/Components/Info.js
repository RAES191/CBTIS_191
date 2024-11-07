import React, { useState } from "react";
import Educacion from "./Educacion";
import { faHeartPulse, faBolt, faUtensils, faLaptopCode, faUserGraduate, faFutbol, faLightbulb, faBriefcase, faTooth } from "@fortawesome/free-solid-svg-icons";
import "../Styles/Info.css";

function Info() {
  // Estado para controlar el índice de las actividades
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);

  // Lista de actividades que cambian al hacer clic
  const activities = [
    {
      title: "Orientación Vocacional",
      description: "Acompañamos a los estudiantes en su proceso de elección de carrera, ofreciéndoles herramientas y orientación para identificar sus intereses y habilidades.",
      icon: faUserGraduate,
    },
    {
      title: "Actividades Extracurriculares",
      description: "Fomentamos el desarrollo integral de nuestros estudiantes a través de una amplia variedad de actividades extracurriculares, desde deportes hasta programas artísticos y culturales.",
      icon: faFutbol,
    },
    {
      title: "Innovación y Emprendimiento",
      description: "Potenciamos el espíritu emprendedor y la creatividad de los estudiantes, proporcionándoles las herramientas necesarias para convertir sus ideas en proyectos innovadores.",
      icon: faLightbulb,
    },
  ];

  // Función para cambiar la actividad al hacer clic
  const showNextActivity = () => {
    setCurrentActivityIndex((prevIndex) => (prevIndex + 1) % activities.length);
  };

  return (
    <div className="info-section" id="services">
      {/* Sección de Especialidades */}
      <div className="info-title-content">
        <h3 className="info-title">
          <span>Educación</span>
        </h3>
        <p className="info-description">
          En nuestra escuela preparatoria, cultivamos una cultura de aprendizaje práctico. 
          A través de cinco áreas especializadas, los estudiantes fusionan rigor analítico, 
          curiosidad e imaginación para abordar desafíos sociales. Desde tecnología hasta 
          atención médica, ofrecemos excelencia en cada disciplina, comprometiéndonos a preparar 
          a los estudiantes para destacar en un futuro dinámico.
        </p>
      </div>

      <div className="info-cards-content">
        {/* Especialidades */}
        <Educacion
          title="Programación"
          description="Explora el fascinante mundo de la programación,
          donde los estudiantes adquieren habilidades en codificación y
          desarrollo de software. Desde la creación de aplicaciones hasta
          el diseño de soluciones tecnológicas innovadoras, esta especialidad
          abre puertas en el campo de la informática."
          icon={faLaptopCode}
        />

        <Educacion
          title="Enfermería"
          description="Adéntrate en la atención de la salud y el bienestar de
          las personas. La especialidad de enfermería brinda conocimientos
          fundamentales en cuidado clínico, gestión de pacientes y promoción
          de la salud. Los estudiantes se preparan para desempeñar un papel
          crucial en entornos de atención médica."
          icon={faHeartPulse}
        />

        <Educacion
          title="Administración de Recursos Humanos"
          description="Sumérgete en la gestión estratégica de talento humano.
          Los estudiantes aprenden a liderar equipos, manejar relaciones laborales
          y optimizar recursos para potenciar el rendimiento organizacional."
          icon={faBriefcase}
        />

        <Educacion
          title="Electricidad"
          description="Descubre el mundo de la electricidad, desde circuitos
          básicos hasta sistemas complejos. Esta especialidad proporciona conocimientos
          prácticos en instalación, mantenimiento y reparación de sistemas eléctricos,
          preparando a los estudiantes para desafíos en la ingeniería eléctrica."
          icon={faBolt}
        />

        <Educacion
          title="Preparación de Alimentos y Bebidas"
          description="Explora el arte culinario y la gestión de servicios alimentarios.
          Esta especialidad abarca desde técnicas culinarias hasta la administración de
          restaurantes. Los estudiantes desarrollan habilidades prácticas en cocina,
          diseño de menús y gestión de establecimientos gastronómicos."
          icon={faUtensils}
        />

        <div onClick={showNextActivity} >
          <Educacion
            title={activities[currentActivityIndex].title}
            description={activities[currentActivityIndex].description}
            icon={activities[currentActivityIndex].icon}
          />
        </div>
      </div>
      </div>
      );
}

export default Info;
