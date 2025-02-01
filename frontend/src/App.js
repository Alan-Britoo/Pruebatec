import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import SearchRestaurants from "./components/SearchRestaurants";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <SearchRestaurants /> : <Login setUser={setUser} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchRestaurants />} />{" "}
        <Route path="/login" element={<Login setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
