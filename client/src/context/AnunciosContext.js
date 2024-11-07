import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AdContext = createContext();

export const AdContextProvider = ({ children }) => {
  const [anuncios, setAnuncios] = useState([]);

  // Función para obtener anuncios de la API
  const fetchAnuncios = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/anuncios", {
        withCredentials: true,
      });
      setAnuncios(res.data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  useEffect(() => {
    fetchAnuncios(); // Cargar los anuncios al montar el componente
  }, []);

  return (
    <AdContext.Provider value={{ anuncios }}>
      {children}
    </AdContext.Provider>
  );
};
