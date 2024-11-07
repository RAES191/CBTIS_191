import React, { useState, useEffect, useContext } from 'react'; // Agregar useContext
import axios from 'axios';
import '../Styles/Anuncios.css'; 
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Badge from "react-bootstrap/Badge";
import { AuthContext } from "../context/authContext"; // Asegúrate de que AuthContext esté definido correctamente
import Footer from './Footer';  // Ajusta la ruta según la ubicación de tu archivo

// Componente para la experiencia
const Experience = ({ resumeExperience, resumeBasicInfo }) => {
  if (resumeExperience && resumeBasicInfo) {
    var sectionName = resumeBasicInfo.section_name.experience;
    var work = resumeExperience.map(function (work, i) {
      const technologies = work.technologies;
      const mainTechnologies = work.mainTech;

      var mainTech = mainTechnologies.map((technology, i) => {
        return (
          <Badge pill className="main-badge mr-2 mb-2" key={i}>
            {technology}
          </Badge>
        );
      });
      var tech = technologies.map((technology, i) => {
        return (
          <Badge pill className="experience-badge mr-2 mb-2" key={i}>
            {technology}
          </Badge>
        );
      });
      return (
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date={work.years}
          icon={<i className="fab fa-angular experience-icon"></i>}
          key={i}
        >
          <div className="main-tech">
            {mainTech}
          </div>

          <h3 className="vertical-timeline-element-title">
            {work.title}
          </h3>
          <h4 className="vertical-timeline-element-subtitle">
            {work.company}
          </h4>
          <div className="technologies">
            {tech}
          </div>
        </VerticalTimelineElement>
      );
    });
  }

  return (
    <section id="resume" className="pb-5">
      <div className="col-md-12 mx-auto">
        <div className="col-md-12">
          <h1 className="section-title">
            <span className="text-black">
              {sectionName}
            </span>
          </h1>
        </div>
      </div>
      <div className="col-md-8 mx-auto">
        <VerticalTimeline>
          {work}
          <VerticalTimelineElement
            iconStyle={{
              background: "#AE944F", 
              color: "#fff",         
              textAlign: "center",
            }}
            icon={
              <i className="fas fa-hourglass-start mx-auto experience-icon"></i>
            }
          />
        </VerticalTimeline>
      </div>
    </section>
  );
};

// Componente principal del dashboard
const AnunciosAdmin = () => {
  const { currentUser } = useContext(AuthContext); // Asegúrate de llamar a useContext aquí
  const [announcements, setAnnouncements] = useState([]);
  const [parentInfo, setParentInfo] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const storedControlNumber = localStorage.getItem('controlNumber'); 
    if (storedControlNumber) {
      fetchParentInfo(storedControlNumber);
    }
  }, []);

  const fetchParentInfo = async (controlNumber) => {
    try {
      const response = await axios.get(`http://localhost:8800/api/EntradaMenu/${controlNumber}`);
      setParentInfo(response.data.parent); 
    } catch (error) {
      console.error("Error fetching parent info:", error);
    } finally {
      setLoading(false); 
    }
  };

  const resumeBasicInfo = {
    section_name: {
      experience: "Anuncios",
    },
  };
  const resumeExperience = [
    {
      title: "Desarrollador Frontend",
      company: "Empresa X",
      years: "2019 - Presente",
      mainTech: ["React", "JavaScript"],
      technologies: ["HTML", "CSS", "Bootstrap", "Node.js"],
    },
    {
      title: "Desarrollador Backend",
      company: "Empresa Y",
      years: "2017 - 2019",
      mainTech: ["Node.js", "Express"],
      technologies: ["MongoDB", "Docker", "AWS"],
    },
  ];

  return (
    <div className="parent-dashboard-container">
      {/* Mostrar el mensaje de bienvenida o el mensaje de carga */}
      {!loading && parentInfo ? (
        <h1>Bienvenido {currentUser?.username || "Guest"}</h1>
      ) : (
        <h1>Bienvenido {currentUser?.username || "Guest"}</h1>
      )}
      <div className="announcements">
        {announcements.map((announcement, index) => (
          <div key={index} className="announcement-item">
            <h3>{announcement.title}</h3>
            <p>{announcement.content}</p>
            <p>{new Date(announcement.date).toLocaleString()}</p>
          </div>
        ))}
      </div>

      <Experience resumeExperience={resumeExperience} resumeBasicInfo={resumeBasicInfo} />
    </div>
    
    

  );
}


export default AnunciosAdmin;
