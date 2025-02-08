import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // Importa PropTypes
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-logo">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/018/795/372/small/fitness-and-gym-logo-free-png.png"
            alt="Olympia GYM Logo"
            className="logo-img"
          />
          <span className="logo-text">Olympia GYM</span>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/memberships">Memberships</Link>
          <Link to="/rutinas">Rutinas</Link>
        </div>
      </nav>
      <main className="main-content">{children}</main>
    </div>
  );
};

// Define las PropTypes para validar las props
Layout.propTypes = {
  children: PropTypes.node.isRequired, // children debe ser un nodo de React y es obligatorio
};

export default Layout;

