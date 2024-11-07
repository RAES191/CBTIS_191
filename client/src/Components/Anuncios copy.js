import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../Styles/Anuncios.css'; 
import Sidebar from './AdminDashboard/Sidebar';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component"; 
import "react-vertical-timeline-component/style.min.css";
import Badge from "react-bootstrap/Badge";
import { AuthContext } from "../context/authContext"; // Asegúrate de que AuthContext esté definido correctamente

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
const ParentDashboard = () => {
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
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar /> {/* Sidebar agregada */}
      <main className="main-content">
        <h1>Bienvenido, {currentUser?.username}</h1>
        <section>
          {/* Aquí puedes agregar el contenido principal del dashboard */}
          {/* Ejemplo de componente Experience */}
          <Experience resumeExperience={[]} resumeBasicInfo={{ section_name: { experience: "Experiencia" } }} />
        </section>
      </main>
    </div>
  );
};

export default ParentDashboard;
