import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

function Inicio() {
  return (
    <div className="inicio">
      <div className="gym-name">OLYMPIA GYM</div>
      <h1>
        BUILD <span>YOUR</span> <span className="highlight">BODY STRONG</span>
      </h1>
      <p className="description">
        Ready to change your physique, but can't work out in the gym?
      </p>
      <Link to="/login">
        <button>Iniciar Sesión</button>
      </Link>
    </div>
  );
}

function Login() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [empresaData, setEmpresaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newEmpresa, setNewEmpresa] = useState({ nombre: '', telefono: '', email: '' });
  const [editEmpresa, setEditEmpresa] = useState(null); // Estado para los datos de la empresa a editar
  const [showForm, setShowForm] = useState(false); // Estado para controlar la visibilidad del modal
  const [showEditForm, setShowEditForm] = useState(false); // Estado para controlar la visibilidad del modal de edición

  const fetchEmpresaData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/empresas');
      console.log('Datos recibidos:', response.data);
      setEmpresaData(response.data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteEmpresa = async (id) => {
    try {
      await axios.delete(`/api/empresas/${id}`);
      // Después de eliminar, volvemos a obtener los datos actualizados
      fetchEmpresaData();
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  const handleNewEmpresaChange = (e) => {
    const { name, value } = e.target;
    setNewEmpresa((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNewEmpresa = async () => {
    try {
      await axios.post('/api/empresas', newEmpresa);
      setNewEmpresa({ nombre: '', telefono: '', email: '' }); // Limpiar el formulario
      setShowForm(false); // Cerrar el modal
      fetchEmpresaData(); // Recargar los datos
    } catch (error) {
      console.error('Error al agregar nueva empresa:', error);
    }
  };

  const handleEditEmpresaChange = (e) => {
    const { name, value } = e.target;
    setEditEmpresa((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateEmpresa = async () => {
    try {
      await axios.put(`/api/empresas/${editEmpresa.id}`, editEmpresa);
      setShowEditForm(false); // Cerrar el modal de edición
      fetchEmpresaData(); // Recargar los datos
    } catch (error) {
      console.error('Error al actualizar empresa:', error);
    }
  };

  const renderTable = () => {
    if (empresaData && empresaData.length > 0) {
      return (
        <table className="empresa-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empresaData.map((empresa) => (
              <tr key={empresa.id}>
                <td>{empresa.id}</td>
                <td>{empresa.nombre}</td>
                <td>{empresa.telefono}</td>
                <td>{empresa.email}</td>
                <td>
                  <button onClick={() => deleteEmpresa(empresa.id)} className="delete-button">
                    Eliminar
                  </button>
                  <button
                    onClick={() => {
                      setEditEmpresa(empresa); // Cargar los datos de la empresa a editar
                      setShowEditForm(true); // Mostrar el modal de edición
                    }}
                    className="edit-button"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    return <p>No hay datos disponibles</p>;
  };

  const renderContent = () => {
    if (selectedOption === 'empresa') {
      if (loading) {
        return <div>Cargando datos...</div>;
      }

      return (
        <div>
          <h2>Información de la Empresa</h2>
          <button onClick={() => setShowForm(true)} className="add-button">
            Nuevo
          </button>
          {renderTable()}
        </div>
      );
    }
    return <p>Selecciona una opción del menú.</p>;
  };

  return (
    <div className="login-container">
      <aside className="menu">
        <ul>
          <li>
            <button
              onClick={() => {
                setSelectedOption('empresa');
                fetchEmpresaData();
              }}
            >
              Empresa
            </button>
          </li>
        </ul>
      </aside>
      <main className={`content ${selectedOption ? 'expanded' : ''}`}>
        {renderContent()}
      </main>

      {/* Modal para agregar nueva empresa */}
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Agregar nueva empresa</h3>
            <input
              type="text"
              name="nombre"
              value={newEmpresa.nombre}
              onChange={handleNewEmpresaChange}
              placeholder="Nombre"
            />
            <input
              type="text"
              name="telefono"
              value={newEmpresa.telefono}
              onChange={handleNewEmpresaChange}
              placeholder="Teléfono"
            />
            <input
              type="email"
              name="email"
              value={newEmpresa.email}
              onChange={handleNewEmpresaChange}
              placeholder="Email"
            />
            <div className="modal-buttons">
              <button onClick={addNewEmpresa} className="add-button">
                Agregar
              </button>
              <button onClick={() => setShowForm(false)} className="cancel-button">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar empresa */}
      {showEditForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Editar empresa</h3>
            <input
              type="text"
              name="nombre"
              value={editEmpresa.nombre}
              onChange={handleEditEmpresaChange}
              placeholder="Nombre"
            />
            <input
              type="text"
              name="telefono"
              value={editEmpresa.telefono}
              onChange={handleEditEmpresaChange}
              placeholder="Teléfono"
            />
            <input
              type="email"
              name="email"
              value={editEmpresa.email}
              onChange={handleEditEmpresaChange}
              placeholder="Email"
            />
            <div className="modal-buttons">
              <button onClick={updateEmpresa} className="add-button">
                Guardar
              </button>
              <button onClick={() => setShowEditForm(false)} className="cancel-button">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
