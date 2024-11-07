import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const AdminRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  // Verificar si el usuario tiene permisos de administrador
  return currentUser?.permissions === "admin" ? children : <Navigate to="/" />;
};

export default AdminRoute;
