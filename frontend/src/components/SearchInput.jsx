import React from "react";

const SearchInput = ({ searchTerm, setSearchTerm, onSearchClick }) => (
  <div style={{ marginTop: "20px" }}>
    <input
      type="text"
      placeholder="Buscar por nombre..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <button onClick={onSearchClick} style={{ marginLeft: "10px" }}>
      Buscar
    </button>
  </div>
);

export default SearchInput;
