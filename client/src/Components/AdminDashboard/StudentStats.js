import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faChalkboardTeacher, faUserTie } from '@fortawesome/free-solid-svg-icons';
import '../../Styles/Dashboard.css';

const StudentStats = ({ students, teachers, privateTeachers }) => {
  return (
    <div className="stats-container">
      <div className="stat-box orange">
        <div className="stat-content">
          <div className="stat-text">
          <h2>{students}</h2>
            <p>Students</p>
          </div>
          <div className="stat-icon">
            <div className="icon-circle">
              <FontAwesomeIcon icon={faGraduationCap} size="2x" />
            </div>
          </div>
        </div>
      </div>

      <div className="stat-box purple">
        <div className="stat-content">
          <div className="stat-text">
          <h2>{teachers}</h2>
           <p>Teachers</p>
          </div>
          <div className="stat-icon">
            <div className="icon-circle">
              <FontAwesomeIcon icon={faChalkboardTeacher} size="2x" />
            </div>
          </div>
        </div>
      </div>

      <div className="stat-box blue">
        <div className="stat-content">
          <div className="stat-text">
          <h2>{privateTeachers}</h2>
            <p>Private Teachers</p>
          </div>
          <div className="stat-icon">
            <div className="icon-circle">
              <FontAwesomeIcon icon={faUserTie} size="2x" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentStats;
