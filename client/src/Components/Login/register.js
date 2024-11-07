import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // Mantener el CSS original
import login_img from "../../Assets/img-login2.png";

function Signin() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "", // Agregar el campo "name"
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Actualización de los inputs
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Manejo del submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir recarga de página

    // Validaciones
    if (inputs.username.length < 3) {
      alert("¡Nombre de usuario debe contener mínimo 3 caracteres!");
    } else if (inputs.password.length === 0) {
      alert("¡Contraseña está en blanco!");
    } else if (inputs.password.length <= 5) {
      alert("¡La contraseña debe contener mínimo 6 caracteres!");
    } else if (inputs.email.length === 0) {
      alert("¡Email está en blanco!");
    } else if (!validarCorreo(inputs.email)) {
      alert("¡El correo electrónico no es válido!");
    } else {
      try {
        // Aquí se está utilizando la misma ruta del segundo código para la base de datos
        await axios.post("http://localhost:8800/api/auth/register", inputs);
        alert("¡Registro exitoso!");
        navigate("/"); // Redirigir al home o login
      } catch (err) {
        setError(err.response.data);
      }
    }
  };

  // Validación de correo electrónico
  const validarCorreo = (correo) => {
    var regex = /^[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]{4,}\.[a-zA-Z]{2,}$/;
    if (correo.length > 256) return false;
    if (!regex.test(correo)) return false;
    var partes = correo.split("@");
    if (partes[0].length < 1 || partes[0].length > 64 || partes[1].length < 4 || partes[1].length > 255) {
      return false;
    }
    return true;
  };

  return (
    <div className="login">
      <div className="login__content">
        <div className="login__img">
          <img className="login_img-image1" src={login_img} alt="login_img" />
        </div>

        <div className="login__forms">
          <form onSubmit={handleSubmit} className="login__registre">
            <h1 className="login__title">Registrarse</h1>

            {/* Campo de nombre de usuario */}
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

            {/* Campo de contraseña */}
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

            {/* Campo de correo electrónico */}
            <div className="login__box">
              <i className="bx bx-user login__icon"></i>
              <input
                type="email"
                placeholder="Correo Electrónico"
                className="login__input"
                name="email"
                value={inputs.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Campo de Numero de Control */}
            <div className="login__box">
              <i className="bx bx-user login__icon"></i>
              <input
                type="number"
                placeholder="Numero de Control"
                className="login__input"
                name="controlNumber"
                value={inputs.controlNumber}
                onChange={handleChange}
                required
              />
            </div>

            {error && <div className="login__error">{error}</div>}

            <button type="submit" className="login__button">
              Registrarse
            </button>

            <div>
              <span className="login__account">¿Ya tienes cuenta?{" "}</span>
              <a href="/login" className="login__link">Iniciar sesión</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;
