import React from "react";
import { useNavigate } from "react-router-dom";
import "./menu.css";

function Menu() {
  const navigate = useNavigate();

  // Función para manejar la redirección
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token"); // Eliminar el token
    navigate("/"); // Redirigir al inicio de sesión
  };

  return (
    <div className="menu-container">
      <div className="menu">
        <h1 className="menu-title">Olympia Gym</h1>
        <button onClick={() => handleNavigation("/empresas")}>Empresas</button>
        <button onClick={() => handleNavigation("/office")}>Oficinas</button>
        <button onClick={() => handleNavigation("/customers")}>Clientes</button>
        <button onClick={() => handleNavigation("/memberlist")}>Membresias</button>
        <button onClick={() => handleNavigation("/products")}>Productos</button>
      </div>
      <div>
        {/* Botón para cerrar sesión */}
        <button className="logout-button" onClick={handleLogout}>
          Salir
        </button>
      </div>
    </div>
  );
}

export default Menu;
