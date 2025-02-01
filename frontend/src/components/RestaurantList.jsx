import React, { useState } from "react";

const RestaurantList = ({ restaurants }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculamos los índices de los restaurantes para la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = restaurants.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calcular el número de páginas
  const totalPages = Math.ceil(restaurants.length / itemsPerPage);

  return (
    <div>
      <h3>Resultados:</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo de Comida</th>
            <th>Latitud</th>
            <th>Longitud</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((restaurant, index) => (
            <tr key={index}>
              <td>{restaurant.nombre}</td>
              <td>{restaurant.tipoComida || "No especificado"}</td>
              <td>{restaurant.lat}</td>
              <td>{restaurant.lon}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={index + 1 === currentPage ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
