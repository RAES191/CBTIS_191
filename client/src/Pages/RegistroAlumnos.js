import React from "react";
import RegistroAlumnos from "../Components/RegistroAlumnos.js";
import Navbar from "../Components/Navbar.js";
import Footer from "../Components/Footer";

function Appointment() {

  //return <RegistroAlumnos />;
  return (
    <div className="home-section">
      <Navbar />
      <RegistroAlumnos />
      <Footer />
    </div>
  );
}

export default Appointment;
