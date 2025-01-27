import React, { useState, useEffect } from "react"
import axios from "axios"
import "./empresas.css"

function Empresas() {
  const [empresaData, setEmpresaData] = useState([])
  const [loading, setLoading] = useState(false)
  const [newEmpresa, setNewEmpresa] = useState({ nombre: "", telefono: "", email: "" })
  const [editEmpresa, setEditEmpresa] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)

  // Fetch empresa data from the API
  const fetchEmpresaData = async () => {
    console.log("Intentando obtener datos...")
    try {
      setLoading(true)
      const response = await axios.get("/api/empresas") // Usar el proxy aquí
      console.log("Datos recibidos:", response.data)
      setEmpresaData(response.data)
    } catch (error) {
      console.error("Error al obtener datos:", error)
    } finally {
      setLoading(false)
    }
  }

  // Obtiene los datos de las empresas cuando el componente se monta
  useEffect(() => {
    fetchEmpresaData()
  }, []) // El array vacío asegura que solo se ejecute una vez cuando el componente se monte

  // Delete empresa
  const deleteEmpresa = async (id) => {
    try {
      await axios.delete(`/api/empresas/${id}`) // Usar el proxy aquí también
      fetchEmpresaData()
    } catch (error) {
      console.error("Error al eliminar:", error)
    }
  }

  // Handle input change for creating new empresa
  const handleNewEmpresaChange = (e) => {
    const { name, value } = e.target
    setNewEmpresa((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Add new empresa
  const addNewEmpresa = async () => {
    try {
      await axios.post("/api/empresas", newEmpresa) // Usar el proxy aquí también
      setNewEmpresa({ nombre: "", telefono: "", email: "" })
      setShowForm(false)
      fetchEmpresaData()
    } catch (error) {
      console.error("Error al agregar nueva empresa:", error)
    }
  }

  // Handle input change for editing empresa
  const handleEditEmpresaChange = (e) => {
    const { name, value } = e.target
    setEditEmpresa((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Update empresa
  const updateEmpresa = async () => {
    try {
      await axios.put(`/api/empresas/${editEmpresa.id}`, editEmpresa) // Usar el proxy aquí también
      setShowEditForm(false)
      fetchEmpresaData()
    } catch (error) {
      console.error("Error al actualizar empresa:", error)
    }
  }

  // Render table with empresa data
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
                  {/* Botones para editar y eliminar */}
                  <button onClick={() => deleteEmpresa(empresa.id)} className="delete-button">
                    Eliminar
                  </button>
                  <button
                    onClick={() => {
                      setEditEmpresa(empresa)
                      setShowEditForm(true)
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
      )
    }
    return <p>No hay datos disponibles</p>
  }

  return (
    <div className="empresas-container">
      <h2>Información de la Empresa</h2>
      <button onClick={() => setShowForm(true)} className="add-button">
        Nuevo
      </button>

      {loading ? <div>Cargando datos...</div> : renderTable()}

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

      {/* Botón Atrás */}
      <button onClick={() => (window.location.href = "/menu")} className="back-button">
        Atrás
      </button>
    </div>
  )
}

export default Empresas

