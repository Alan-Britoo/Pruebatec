import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Estado para mostrar errores
  const navigate = useNavigate();

  // Si el usuario ya tiene un token, redirigirlo a "/search"
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/search");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5002/api/auth/login",
        { email, password }
      );
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", email); // Guardamos el correo en localStorage
      navigate("/search"); // Redirigir a la página principal
    } catch (error) {
      setError("Credenciales incorrectas o problema con el servidor."); // Mostrar mensaje de error
      console.error("Error de login", error);
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register"); // Redirigir a la página de registro
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}{" "}
      {/* Mostrar error si existe */}
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Iniciar sesión</button>
      {/* Botón para redirigir a la página de registro */}
      <button type="button" id="register" onClick={handleRegisterRedirect}>
        Registrarse
      </button>
    </form>
  );
};

export default Login;
