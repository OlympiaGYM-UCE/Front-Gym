import React, { useState, useEffect } from "react"
import axios from "axios"
import "./trainers.css"

function Trainers() {
  const [trainerData, setTrainerData] = useState([])
  const [empresaData, setEmpresaData] = useState([])
  const [loading, setLoading] = useState(false)
  const [newTrainer, setNewTrainer] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    idsucursal: ""
  })
  const [editTrainer, setEditTrainer] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)

  // Fetch both trainer and empresa data
  const fetchData = async () => {
    console.log("Intentando obtener datos...")
    try {
      setLoading(true)
      const [trainersResponse, empresasResponse] = await Promise.all([
        axios.get("/api/trainers"),
        axios.get("/api/empresas")
      ])
      console.log("Datos de entrenadores recibidos:", trainersResponse.data)
      console.log("Datos de empresas recibidos:", empresasResponse.data)
      setTrainerData(trainersResponse.data)
      setEmpresaData(empresasResponse.data)
    } catch (error) {
      console.error("Error al obtener datos:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Delete trainer
  const deleteTrainer = async (id) => {
    try {
      await axios.delete(`/api/trainers/${id}`)
      fetchData()
    } catch (error) {
      console.error("Error al eliminar:", error)
    }
  }

  // Handle input change for creating new trainer
  const handleNewTrainerChange = (e) => {
    const { name, value } = e.target
    setNewTrainer((prev) => ({
      ...prev,
      [name]: name === "idsucursal" ? parseInt(value) : value,
    }))
  }

  // Add new trainer
  const addNewTrainer = async () => {
    try {
      await axios.post("/api/trainers", newTrainer)
      setNewTrainer({
        nombre: "",
        correo: "",
        telefono: "",
        idsucursal: ""
      })
      setShowForm(false)
      fetchData()
    } catch (error) {
      console.error("Error al agregar nuevo entrenador:", error)
    }
  }

  // Handle input change for editing trainer
  const handleEditTrainerChange = (e) => {
    const { name, value } = e.target
    setEditTrainer((prev) => ({
      ...prev,
      [name]: name === "idsucursal" ? parseInt(value) : value,
    }))
  }

  // Update trainer
  const updateTrainer = async () => {
    try {
      await axios.put(`/api/trainers/${editTrainer.id}`, editTrainer)
      setShowEditForm(false)
      fetchData()
    } catch (error) {
      console.error("Error al actualizar entrenador:", error)
    }
  }

  // Get empresa name by ID
  const getEmpresaName = (idsucursal) => {
    const empresa = empresaData.find(emp => emp.id === idsucursal)
    return empresa ? empresa.nombre : 'No encontrada'
  }

  // Render table with trainer data
  const renderTable = () => {
    if (trainerData && trainerData.length > 0) {
      return (
        <table className="trainer-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Sucursal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {trainerData.map((trainer) => (
              <tr key={trainer.id}>
                <td>{trainer.id}</td>
                <td>{trainer.nombre}</td>
                <td>{trainer.correo}</td>
                <td>{trainer.telefono}</td>
                <td>{getEmpresaName(trainer.idsucursal)}</td>
                <td>
                  <button onClick={() => deleteTrainer(trainer.id)} className="delete-button">
                    Eliminar
                  </button>
                  <button
                    onClick={() => {
                      setEditTrainer(trainer)
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

  const renderTrainerForm = (trainer, handleChange, submitAction, title) => (
    <div className="modal">
      <div className="modal-content">
        <h3>{title}</h3>
        <input
          type="text"
          name="nombre"
          value={trainer.nombre}
          onChange={handleChange}
          placeholder="Nombre"
        />
        <input
          type="email"
          name="correo"
          value={trainer.correo}
          onChange={handleChange}
          placeholder="Correo"
        />
        <input
          type="text"
          name="telefono"
          value={trainer.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
        />
        <select
          name="idsucursal"
          value={trainer.idsucursal}
          onChange={handleChange}
          className="sucursal-select"
        >
          <option value="">Seleccione una sucursal</option>
          {empresaData.map((empresa) => (
            <option key={empresa.id} value={empresa.id}>
              {empresa.nombre}
            </option>
          ))}
        </select>
        <div className="modal-buttons">
          <button onClick={submitAction} className="add-button">
            {title === "Agregar nuevo entrenador" ? "Agregar" : "Guardar"}
          </button>
          <button 
            onClick={() => title === "Agregar nuevo entrenador" ? setShowForm(false) : setShowEditForm(false)} 
            className="cancel-button"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="trainers-container">
      <h2>Información de Entrenadores</h2>
      <button onClick={() => setShowForm(true)} className="add-button">
        Nuevo Entrenador
      </button>

      {loading ? <div>Cargando datos...</div> : renderTable()}

      {/* Modal para agregar nuevo entrenador */}
      {showForm && renderTrainerForm(newTrainer, handleNewTrainerChange, addNewTrainer, "Agregar nuevo entrenador")}

      {/* Modal para editar entrenador */}
      {showEditForm && renderTrainerForm(editTrainer, handleEditTrainerChange, updateTrainer, "Editar entrenador")}

      {/* Botón Atrás */}
      <button onClick={() => (window.location.href = "/menu")} className="back-button">
        Atrás
      </button>
    </div>
  )
}

export default Trainers