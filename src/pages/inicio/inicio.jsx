import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./inicio.css";

function Inicio() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  // Función para verificar si el token ha expirado
  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodificar el payload del token
      return payload.exp * 1000 < Date.now(); // Verificar si ha expirado
    } catch (err) {
      return true; // Si hay un error al decodificar, considerar el token como expirado
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica de campos
    if (!credentials.email || !credentials.password) {
      setError('Por favor, completa todos los campos');
      return;
    }

    try {
      const response = await fetch('http://localhost:2222/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Guardar el token en localStorage

        // Verificar si el token ha expirado
        if (isTokenExpired(data.token)) {
          localStorage.removeItem('token'); // Eliminar el token expirado
          setError('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
          return;
        }

        navigate('/menu'); // Redirigir al usuario a la página protegida
      } else {
        setError(data.message || 'Error al iniciar sesión'); // Mostrar mensaje de error del backend
      }
    } catch (err) {
      setError('Error de conexión con el servidor'); // Mostrar mensaje de error de conexión
    }
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token
    navigate('/'); // Redirigir al usuario a la página de inicio de sesión
  };

  return (
    <div className="inicio">
      <div className="hero-content">
        <div className="hero-text">
          <h1>
            Today is the perfect day to start
            <span className="highlight-text"> your best version</span>
          </h1>
          <button 
  onClick={() => navigate('/consultar')}
  style={{
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px'
  }}
>
  Consultar Membresía
</button>
        </div>
        <div className="login-section">
        </div>
        <div className="login-section">
          <div className="login-box">
            <h2>Iniciar Sesión</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="login-button">
                Iniciar Sesión 
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
