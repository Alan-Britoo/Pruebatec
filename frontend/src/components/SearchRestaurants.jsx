import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchButton from "./SearchButton";
import SearchInput from "./SearchInput";
import RestaurantList from "./RestaurantList";
import Historial from "./Historial";

const SearchRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("email");
    if (!token) {
      navigate("/login");
    } else {
      setEmail(storedEmail);
    }
  }, [navigate]);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const token = localStorage.getItem("token");

          try {
            const response = await axios.get(
              `http://localhost:5002/api/localitation/restaurantes_cercanos?lat=${latitude}&lng=${longitude}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (response.data && response.data.restaurantes) {
              setRestaurants(response.data.restaurantes);
              setFilteredRestaurants(response.data.restaurantes);
            } else {
              setError("No se encontraron restaurantes cercanos.");
            }
          } catch (error) {
            setError("Hubo un error al buscar restaurantes.");
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          setError("No se pudo obtener tu ubicación.");
          setLoading(false);
        }
      );
    } else {
      setError("La geolocalización no está soportada por este navegador.");
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    navigate("/login");
  };

  const handleFilter = async () => {
    if (searchTerm === "") {
      setFilteredRestaurants(restaurants);
      return;
    }

    const filtered = restaurants.filter((restaurant) =>
      restaurant.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRestaurants(filtered);

    if (filtered.length > 0) {
      const token = localStorage.getItem("token");
      const firstRestaurant = filtered[0];
      const latitud = firstRestaurant.lat;
      const longitud = firstRestaurant.lon;

      const searchData = {
        usuario_email: email || "No especificado",
        nombre_restaurante: firstRestaurant.nombre || "Desconocido",
        tipo_comida: firstRestaurant.tipoComida || "No especificado",
        latitud: latitud !== undefined ? latitud : "FALTA",
        longitud: longitud !== undefined ? longitud : "FALTA",
      };

      try {
        await axios.post(
          "http://localhost:5002/api/historial/guardar_historial",
          searchData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Error al guardar en el historial:", error.message);
      }
    }
  };

  const handleVerHistorial = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.get(
        `http://localhost:5002/api/historial/ver_historial?user=${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setHistorial(response.data.historial);
      setMostrarHistorial(true);
    } catch (error) {
      console.error("Error al obtener el historial:", error.message);
    }
  };

  return (
    <div>
      <p>Bienvenido: {email}</p>
      <SearchButton onClick={handleSearch} loading={loading} />
      <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
        Cerrar sesión
      </button>
      <button onClick={handleVerHistorial} style={{ marginLeft: "10px" }}>
        Ver historial
      </button>

      <SearchInput
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearchClick={handleFilter}
      />

      {error && <p>{error}</p>}

      <RestaurantList restaurants={filteredRestaurants} />

      {mostrarHistorial && <Historial historial={historial} />}
    </div>
  );
};

export default SearchRestaurants;
