import React, { useState } from "react";

const Historial = ({ historial }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculamos los índices de los elementos del historial para la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = historial.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calcular el número de páginas
  const totalPages = Math.ceil(historial.length / itemsPerPage);

  return (
    <div>
      <h3>Historial de búsqueda:</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre Restaurante</th>
            <th>Tipo de Comida</th>
            <th>Latitud</th>
            <th>Longitud</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{item.nombre_restaurante}</td>
              <td>{item.tipo_comida || "No especificado"}</td>
              <td>{item.latitud}</td>
              <td>{item.longitud}</td>
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

export default Historial;
