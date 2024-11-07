import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/authContext";
import "./Login.css";
import login_img from "../../Assets/img-login2.png";

function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputs.username.length < 3) {
      alert("¡Nombre de usuario debe contener mínimo 3 caracteres!");
      return;
    }
    if (inputs.password.length <= 5) {
      alert("¡La contraseña debe contener mínimo 6 caracteres!");
      return;
    }

    try {
      const user = await login(inputs); // Devuelve el usuario con permisos
      console.log("El permiso del usuario es:", user.permissions); // Mostrar en consola

      // Verificar permisos
      if (user.permissions === 'admin') {
        navigate("/admin-dashboard"); // Redirigir a un dashboard de administrador
      } else if (user.permissions === 'moderator') {
        navigate("/moderator-dashboard");
      } else {
        navigate("/"); // Redirigir al home para usuarios normales
      }
    } catch (err) {
      setError("Error durante el inicio de sesión. Por favor, intenta nuevamente.");
      console.error("Error durante el inicio de sesión:", err);
    }
  };

  return (
    <div className="login">
      <div className="login__content">
        <div className="login__img">
          <img className="login_img-image1" src={login_img} alt="login_img" />
        </div>

        <div className="login__forms">
          <form onSubmit={handleSubmit} className="login__form">
            <h1 className="login__title">Iniciar Sesión</h1>

            <div className="login__box">
              <i className="bx bx-user login__icon"></i>
              <input
                type="text"
                placeholder="Nombre de Usuario"
                className="login__input"
                name="username"
                value={inputs.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="login__box">
              <i className="bx bx-lock-alt login__icon"></i>
              <input
                type="password"
                placeholder="Contraseña"
                className="login__input"
                name="password"
                value={inputs.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && <div className="login__error">{error}</div>}

            <button type="submit" className="login__button">
              Iniciar Sesión
            </button>

            <div>
              <span className="login__account">¿No tienes cuenta?{" "}</span>
              <a href="/register" className="login__link">Regístrate</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
