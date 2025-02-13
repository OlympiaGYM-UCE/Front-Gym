import React, { useState, useEffect } from "react";
import axios from "axios";
import "./memberlist.css";

function Membrelist() {
  const [membershipData, setMembershipData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMembership, setNewMembership] = useState({
    clienteId: "",
    dateStart: "",
    dateEnd: "",
  });
  const [editMembership, setEditMembership] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  // Fetch membership data from the API
  const fetchMembershipData = async () => {
    console.log("Intentando obtener datos...");
    try {
      setLoading(true);
      const response = await axios.get("/api/memberships"); // Usar el endpoint único
      console.log("Datos recibidos:", response.data);
      setMembershipData(response.data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Obtiene los datos de las membresías cuando el componente se monta
  useEffect(() => {
    fetchMembershipData();
  }, []); // El array vacío asegura que solo se ejecute una vez cuando el componente se monte

  // Handle input change for creating new membership
  const handleNewMembershipChange = (e) => {
    const { name, value } = e.target;
    setNewMembership((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add new membership
  const addNewMembership = async () => {
    try {
      await axios.post("/api/memberships", newMembership); // Usar el endpoint único
      setNewMembership({ clienteId: "", dateStart: "", dateEnd: "" });
      setShowForm(false);
      fetchMembershipData();
    } catch (error) {
      console.error("Error al agregar nueva membresía:", error);
    }
  };

  // Handle input change for editing membership
  const handleEditMembershipChange = (e) => {
    const { name, value } = e.target;
    setEditMembership((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update membership
  const updateMembership = async () => {
    try {
      await axios.put(`/api/memberships/${editMembership.id}`, editMembership); // Usar el endpoint único
      setShowEditForm(false);
      fetchMembershipData();
    } catch (error) {
      console.error("Error al actualizar membresía:", error);
    }
  };

  // Render table with membership data
  const renderTable = () => {
    if (membershipData && membershipData.length > 0) {
      return (
        <table className="member-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente ID</th>
              <th>Fecha de Inicio</th>
              <th>Fecha de Fin</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {membershipData.map((membership) => (
              <tr key={membership.id}>
                <td>{membership.id}</td>
                <td>{membership.clienteId}</td>
                <td>{membership.dateStart}</td>
                <td>{membership.dateEnd}</td>
                <td>
                  {/* Botón para editar */}
                  <button
                    onClick={() => {
                      setEditMembership(membership);
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
    <div className="membrelist-container">
      <h2>Información de las Membresías</h2>
      <button onClick={() => setShowForm(true)} className="add-button">
        Nuevo
      </button>

      {loading ? <div>Cargando datos...</div> : renderTable()}

      {/* Modal para agregar nueva membresía */}
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Agregar nueva membresía</h3>
            <input
              type="text"
              name="clienteId"
              value={newMembership.clienteId}
              onChange={handleNewMembershipChange}
              placeholder="Cliente ID"
            />
            <input
              type="date"
              name="dateStart"
              value={newMembership.dateStart}
              onChange={handleNewMembershipChange}
              placeholder="Fecha de Inicio"
            />
            <input
              type="date"
              name="dateEnd"
              value={newMembership.dateEnd}
              onChange={handleNewMembershipChange}
              placeholder="Fecha de Fin"
            />
            <div className="modal-buttons">
              <button onClick={addNewMembership} className="add-button">
                Agregar
              </button>
              <button onClick={() => setShowForm(false)} className="cancel-button">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar membresía */}
      {showEditForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Editar membresía</h3>
            <input
              type="text"
              name="clienteId"
              value={editMembership.clienteId}
              onChange={handleEditMembershipChange}
              placeholder="Cliente ID"
            />
            <input
              type="date"
              name="dateStart"
              value={editMembership.dateStart}
              onChange={handleEditMembershipChange}
              placeholder="Fecha de Inicio"
            />
            <input
              type="date"
              name="dateEnd"
              value={editMembership.dateEnd}
              onChange={handleEditMembershipChange}
              placeholder="Fecha de Fin"
            />
            <div className="modal-buttons">
              <button onClick={updateMembership} className="add-button">
                Guardar
              </button>
              <button onClick={() => setShowEditForm(false)} className="cancel-button">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botón Atrás */}
      <button onClick={() => (window.location.href = "/menu")} className="back-button">
        Atrás
      </button>
    </div>
  );
}

export default Membrelist;