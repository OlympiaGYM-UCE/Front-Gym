/*import React from "react";*/
import { useNavigate } from "react-router-dom";
import "./menu.css";

function Menu() {
  const navigate = useNavigate();

  // Función para manejar la redirección
  const handleNavigation = (path) => {
    navigate(path); // Redirige al path recibido
  };

  return (
    <div className="menu-container">
      <div className="menu">
        <h1 className="menu-title">Olympia Gym</h1>
        <button onClick={() => handleNavigation("/empresas")}>Empresas</button>
        <button onClick={() => handleNavigation("/office")}>Oficinas</button>
        <button onClick={() => handleNavigation("/clientes")}>Clientes</button>
        <button onClick={() => handleNavigation("/entrenadores")}>Entrenadores</button>
        <button onClick={() => handleNavigation("/productos")}>Productos</button>
      </div>
      <div>
        {/* Botón Salir */}
        <button className="logout-button" onClick={() => handleNavigation("/")}>
          Salir
        </button>
      </div>
    </div>
  );
}

export default Menu;
