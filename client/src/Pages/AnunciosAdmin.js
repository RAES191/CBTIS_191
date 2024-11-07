import React from "react";
import AnunciosAdmin from "../Components/AnunciosAdmin.js";
import Navbar from "../Components/Navbar.js";
import Footer from "../Components/Footer.js";

function Home() {
  return (
    <div className="home-section">
      <Navbar />
      <AnunciosAdmin />
      <Footer />
    </div>
  );
}

export default Home;
