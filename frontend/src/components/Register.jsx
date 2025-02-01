import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5002/api/auth/register",
        { email, password }
      );
      console.log("Usuario registrado:", response.data);
      // Redirige al login después del registro exitoso
      navigate("/login");
    } catch (error) {
      console.error("Error al registrar usuario", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Registrarse</button>

      {/* Botón para redirigir al inicio de sesión */}
      <button
        type="button"
        onClick={() => navigate("/login")}
        id="loginButton"
        style={{ marginTop: "10px" }}
      >
        Iniciar sesión
      </button>
    </form>
  );
};

export default Register;
