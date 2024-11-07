import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound"; // Importa el componente 404
import Inscripciones from "./Pages/Inscripciones";
import RegistroAlumnos from "./Pages/RegistroAlumnos";
import EntradaMenu from "./Pages/EntradaMenu";
import Panel from "./Pages/Anuncios";
import Login from "./Pages/register/Login";
import Register from "./Pages/register/Register";
import Perfil from "./Pages/Perfil";
import AdminRoute from "./Components/AdminRoute"; 
import AnunciosAdmin from "./Pages/AnunciosAdmin"; 
import Dashboard from "./Pages/Dashboard"; 

import { AuthContextProvider, AuthContext } from "./context/authContext";
import { AnunciosContextProvider } from "./context/AnunciosContext"; // Importar el contexto de anuncios
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return children;
};

const LoggedInRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Navigate to="/" />;
  }
  return children;
};

function App() {
  const queryClient = new QueryClient();

  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
         <div className="App">
            <Router basename="/">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/inscripcion" element={<Inscripciones />} />
                <Route path="/RegistroAlumnos" element={<RegistroAlumnos />} />
                <Route
                  path="/Dashboard/MenuEntrada"
                  element={
                    <AdminRoute>
                      <EntradaMenu />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/AdminAnuncios"
                  element={
                    <AdminRoute>
                      <AnunciosAdmin />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/Dashboard"
                  element={
                    <AdminRoute>
                      <Dashboard />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/Dashboard/Panel"
                  element={
                    <ProtectedRoute>
                      <Panel />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <LoggedInRoute>
                      <Login />
                    </LoggedInRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <LoggedInRoute>
                      <Register />
                    </LoggedInRoute>
                  }
                />
                <Route
                  path="/perfil"
                  element={
                    <ProtectedRoute>
                      <Perfil />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} /> {/* Ruta para el 404 */}
              </Routes>
            </Router>
          </div>
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default App;
