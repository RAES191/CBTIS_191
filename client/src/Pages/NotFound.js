// src/components/NotFound.js
import React from 'react';
import '../Styles/NotFound.css'; // Asegúrate de que el CSS está en la misma carpeta o ajusta la ruta
import NotFoundImage from '../Assets/404.png'; // Importa la imagen desde la carpeta assets

const NotFound = () => {
  const handleGoBack = () => {
    window.history.back(); // Redirige a la página anterior
  };

  return (
    <section className="container">
      <div className="error">
        <h1>Oh No!</h1>
        <p>No pudimos encontrar la página que buscabas :(</p>
        <div className="cta">
          <button className="cta-back" onClick={handleGoBack}>
            Regresar
          </button>
        </div>
      </div>
      <img
        src={NotFoundImage} // Utiliza la imagen importada
        alt="404 Error"
        className="hero-img"
      />
    </section>
  );
};

export default NotFound;
