import React from "react";

const SearchButton = ({ onClick, loading }) => (
  <button onClick={onClick} disabled={loading}>
    {loading ? "Cargando..." : "Buscar restaurantes cercanos"}
  </button>
);

export default SearchButton;
