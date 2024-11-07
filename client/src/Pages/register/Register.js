import React from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import MainRegister from "../../Components/Login/register";

function Home() {
  return (
    <div className="home-section">
      <Navbar />
      <MainRegister />
      
    </div>
  );
}

export default Home;
