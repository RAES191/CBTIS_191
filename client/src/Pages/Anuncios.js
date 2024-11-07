import React from "react";
import Navbar from "../Components/Navbar";
import Panel from "../Components/Anuncios";
import Footer from "../Components/Footer";

function Home() {
  return (
    <div className="home-section">
      <Navbar />
      <Panel />
      <Footer />
    </div>
  );
}

export default Home;
