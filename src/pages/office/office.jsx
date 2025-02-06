import React, { useState, useEffect } from "react";
import axios from "axios";
import "./office.css";

function Office() {
  const [oficinaData, setOficinaData] = useState([]);
  const [empresaData, setEmpresaData] = useState([]); // Nuevo estado para empresas
  const [loading, setLoading] = useState(false);
  const [newOficina, setNewOficina] = useState({ ubicacion: "", telefono: "", email: "", idempresa: "" });
  const [editOficina, setEditOficina] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  // Fetch oficina data from the API
  const fetchOficinaData = async () => {
    console.log("Intentando obtener datos de oficinas...");
    try {
      setLoading(true);
      const response = await axios.get("/api/office_list");
      console.log("Datos de oficinas recibidos:", response.data);
      const data = Array.isArray(response.data) ? response.data : 
             response.data.data ? response.data.data : 
             [];
      setOficinaData(response.data);
    } catch (error) {
      console.error("Error al obtener datos de oficinas:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch empresa data
  const fetchEmpresaData = async () => {
    console.log("Intentando obtener datos de empresas...");
    try {
      const response = await axios.get("/api/empresas");
      console.log("Datos de empresas recibidos:", response.data);
      setEmpresaData(response.data);
    } catch (error) {
      console.error("Error al obtener datos de empresas:", error);
    }
  };

  // Obtiene los datos cuando el componente se monta
  useEffect(() => {
    fetchOficinaData();
    fetchEmpresaData(); // Carga las empresas al montar el componente
  }, []);

  // Delete oficina
  const deleteOficina = async (id) => {
    try {
      await axios.delete(`/api/office-delete/${id}`);
      fetchOficinaData();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  // Handle input change for creating new oficina
  const handleNewOficinaChange = (e) => {
    const { name, value } = e.target;
    setNewOficina((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add new oficina
  const addNewOficina = async () => {
    try {
      await axios.post("/api/office_save", newOficina);
      setNewOficina({ ubicacion: "", telefono: "", email: "", idempresa: "" });
      setShowForm(false);
      fetchOficinaData();
    } catch (error) {
      console.error("Error al agregar nueva oficina:", error);
    }
  };

  // Handle input change for editing oficina
  const handleEditOficinaChange = (e) => {
    const { name, value } = e.target;
    setEditOficina((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update oficina
  const updateOficina = async () => {
    try {
      await axios.put(`/api/office/${editOficina.id}`, editOficina);
      setShowEditForm(false);
      fetchOficinaData();
    } catch (error) {
      console.error("Error al actualizar oficina:", error);
    }
  };

  // Obtener nombre de empresa por ID
  const getEmpresaName = (idempresa) => {
    const empresa = empresaData.find(emp => emp.id === idempresa);
    return empresa ? empresa.nombre : 'Empresa no encontrada';
  };

  // Render table with oficina data
  const renderTable = () => {
    if (Array.isArray(oficinaData) && oficinaData.length > 0) {
      return (
        <table className="oficina-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ubicación</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Empresa</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {oficinaData.map((oficina) => (
              <tr key={oficina.id}>
                <td>{oficina.id}</td>
                <td>{oficina.ubicacion}</td>
                <td>{oficina.telefono}</td>
                <td>{oficina.email}</td>
                <td>{getEmpresaName(oficina.idempresa)}</td>
                <td>
                  <button onClick={() => deleteOficina(oficina.id)} className="delete-button">
                    Eliminar
                  </button>
                  <button
                    onClick={() => {
                      setEditOficina(oficina);
                      setShowEditForm(true);
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

  return (
    <div className="oficinas-container">
      <h2>Información de las Oficinas</h2>
      <button onClick={() => setShowForm(true)} className="add-button">
        Nueva Oficina
      </button>

      {loading ? <div>Cargando datos...</div> : renderTable()}

      {/* Modal para agregar nueva oficina */}
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Agregar nueva oficina</h3>
            <input
              type="text"
              name="ubicacion"
              value={newOficina.ubicacion}
              onChange={handleNewOficinaChange}
              placeholder="Ubicación"
            />
            <input
              type="text"
              name="telefono"
              value={newOficina.telefono}
              onChange={handleNewOficinaChange}
              placeholder="Teléfono"
            />
            <input
              type="email"
              name="email"
              value={newOficina.email}
              onChange={handleNewOficinaChange}
              placeholder="Email"
            />
            <select
              name="idempresa"
              value={newOficina.idempresa}
              onChange={handleNewOficinaChange}
              className="empresa-select"
            >
              <option value="">Selecciona una empresa</option>
              {empresaData.map((empresa) => (
                <option key={empresa.id} value={empresa.id}>
                  {empresa.nombre}
                </option>
              ))}
            </select>
            <div className="modal-buttons">
              <button onClick={addNewOficina} className="add-button">
                Agregar
              </button>
              <button onClick={() => setShowForm(false)} className="cancel-button">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar oficina */}
      {showEditForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Editar oficina</h3>
            <input
              type="text"
              name="ubicacion"
              value={editOficina.ubicacion}
              onChange={handleEditOficinaChange}
              placeholder="Ubicación"
            />
            <input
              type="text"
              name="telefono"
              value={editOficina.telefono}
              onChange={handleEditOficinaChange}
              placeholder="Teléfono"
            />
            <input
              type="email"
              name="email"
              value={editOficina.email}
              onChange={handleEditOficinaChange}
              placeholder="Email"
            />
            <select
              name="idempresa"
              value={editOficina.idempresa}
              onChange={handleEditOficinaChange}
              className="empresa-select"
            >
              <option value="">Selecciona una empresa</option>
              {empresaData.map((empresa) => (
                <option key={empresa.id} value={empresa.id}>
                  {empresa.nombre}
                </option>
              ))}
            </select>
            <div className="modal-buttons">
              <button onClick={updateOficina} className="add-button">
                Guardar
              </button>
              <button onClick={() => setShowEditForm(false)} className="cancel-button">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <button onClick={() => (window.location.href = "/menu")} className="back-button">
        Atrás
      </button>
    </div>
  );
}

export default Office;