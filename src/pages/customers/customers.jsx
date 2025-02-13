import React, { useState, useEffect } from "react"
import axios from "axios"
import "./customers.css"

function Customers() {
  const [customerData, setCustomerData] = useState([])
  const [empresaData, setEmpresaData] = useState([])
  const [loading, setLoading] = useState(false)
  const [newCustomer, setNewCustomer] = useState({
    cedula: "",
    nombre: "",
    apellido: "", // Añadido el campo apellido
    edad: "",
    peso: "",
    telefono: "",
    correo: "", 
    idsucursal: ""
  })
  const [editCustomer, setEditCustomer] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)

  // Fetch both customer and empresa data
  const fetchData = async () => {
    console.log("Intentando obtener datos...")
    try {
      setLoading(true)
      const [customersResponse, empresasResponse] = await Promise.all([
        axios.get("/api/clients_list"),
        axios.get("/api/bussines")
      ])
      console.log("Datos de clientes recibidos:", customersResponse.data)
      console.log("Datos de empresas recibidos:", empresasResponse.data)
      setCustomerData(customersResponse.data)
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

  // Delete customer
  const deleteCustomer = async (id) => {
    try {
      await axios.delete(`/api/customers/${id}`)
      fetchData()
    } catch (error) {
      console.error("Error al eliminar:", error)
    }
  }

  // Handle input change for creating new customer
  const handleNewCustomerChange = (e) => {
    const { name, value } = e.target
    setNewCustomer((prev) => ({
      ...prev,
      [name]: name === "edad" || name === "idsucursal" 
        ? parseInt(value) // Cambiado a parseInt para el idsucursal
        : name === "peso"
        ? parseFloat(value)
        : value,
    }))
  }

  // Add new customer
  const addNewCustomer = async () => {
    try {
      const customerToSave = {
        ...newCustomer,
        idsucursal: parseInt(newCustomer.idsucursal) // Aseguramos que idsucursal sea número
      }
      await axios.post("/api/clients_save", customerToSave)
      setNewCustomer({
        cedula: "",
        nombre: "",
        apellido: "",
        edad: "",
        peso: "",
        telefono: "",
        correo: "",
        idsucursal: ""
      })
      setShowForm(false)
      fetchData()
    } catch (error) {
      console.error("Error al agregar nuevo cliente:", error)
    }
  }

  // El resto del código permanece exactamente igual...
  const handleEditCustomerChange = (e) => {
    const { name, value } = e.target
    setEditCustomer((prev) => ({
      ...prev,
      [name]: name === "edad" || name === "peso" || name === "idsucursal"
        ? parseFloat(value)
        : value,
    }))
  }

  // Update customer
  const updateCustomer = async () => {
    try {
      await axios.put(`/api/clients_update/${editCustomer.id}`, editCustomer)
      setShowEditForm(false)
      fetchData()
    } catch (error) {
      console.error("Error al actualizar cliente:", error)
    }
  }

  // Get empresa name by ID
  const getEmpresaName = (idsucursal) => {
    const empresa = empresaData.find(emp => emp.id === idsucursal)
    return empresa ? empresa.nombre : 'No encontrada'
  }

  // Render table with customer data
  const renderTable = () => {
    if (customerData && customerData.length > 0) {
      return (
        <table className="customer-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cédula</th>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Peso</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Sucursal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {customerData.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.cedula}</td>
                <td>{customer.nombre}</td>
                <td>{customer.edad}</td>
                <td>{customer.peso}</td>
                <td>{customer.telefono}</td>
                <td>{customer.correo}</td>
                <td>{getEmpresaName(customer.idsucursal)}</td>
                <td>
                  <button onClick={() => deleteCustomer(customer.id)} className="delete-button">
                    Eliminar
                  </button>
                  <button
                    onClick={() => {
                      setEditCustomer(customer)
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

  const renderCustomerForm = (customer, handleChange, submitAction, title) => (
    <div className="modal">
      <div className="modal-content">
        <h3>{title}</h3>
        <input
          type="text"
          name="cedula"
          value={customer.cedula}
          onChange={handleChange}
          placeholder="Cédula"
        />
        <input
          type="text"
          name="nombre"
          value={customer.nombre}
          onChange={handleChange}
          placeholder="Nombre"
        />
        <input
          type="text"
          name="apellido"
          value={customer.apellido}
          onChange={handleChange}
          placeholder="Apellido"
        />
        <input
          type="number"
          name="edad"
          value={customer.edad}
          onChange={handleChange}
          placeholder="Edad"
        />
        <input
          type="number"
          name="peso"
          value={customer.peso}
          onChange={handleChange}
          placeholder="Peso"
          step="0.1"
        />
        <input
          type="text"
          name="telefono"
          value={customer.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
        />
        <input
          type="email"
          name="correo"
          value={customer.correo}
          onChange={handleChange}
          placeholder="Correo"
        />
        <select
          name="idsucursal"
          value={customer.idsucursal}
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
            {title === "Agregar nuevo cliente" ? "Agregar" : "Guardar"}
          </button>
          <button 
            onClick={() => title === "Agregar nuevo cliente" ? setShowForm(false) : setShowEditForm(false)} 
            className="cancel-button"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="customers-container">
      <h2>Información de Clientes</h2>
      <button onClick={() => setShowForm(true)} className="add-button">
        Nuevo Cliente
      </button>

      {loading ? <div>Cargando datos...</div> : renderTable()}

      {/* Modal para agregar nuevo cliente */}
      {showForm && renderCustomerForm(newCustomer, handleNewCustomerChange, addNewCustomer, "Agregar nuevo cliente")}

      {/* Modal para editar cliente */}
      {showEditForm && renderCustomerForm(editCustomer, handleEditCustomerChange, updateCustomer, "Editar cliente")}

      {/* Botón Atrás */}
      <button onClick={() => (window.location.href = "/menu")} className="back-button">
        Atrás
      </button>
    </div>
  )
}

export default Customers