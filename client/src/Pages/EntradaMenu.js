import React from "react";
import Navbar from "../Components/Navbar";
import Menu from "../Components/EntradaMenu";
import Footer from "../Components/Footer";

function Home() {
  return (
    <div className="home-section">
      <Navbar />
      <Menu />
      <Footer />
    </div>
  );
}

export default Home;
