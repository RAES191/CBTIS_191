import React from "react";
import Navbar from "../Components/Navbar";
import Dashboard from "../Components/AdminDashboard/Dashboard";
import Footer from "../Components/Footer";

function Home() {
  return (
    <div className="home-section">
      <Navbar />
      <Dashboard />
    </div>
  );
}

export default Home;
