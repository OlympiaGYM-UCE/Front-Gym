import React, { useState, useEffect } from "react";
import axios from "axios";
import "./products.css";

function Products() {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    stock: "",
    cost: ""
  });
  const [editProduct, setEditProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  // Fetch products data from the API
  const fetchProductsData = async () => {
    console.log("Intentando obtener datos de productos...");
    try {
      setLoading(true);
      const response = await axios.get("/api/prod_list");
      console.log("Datos de productos recibidos:", response.data);
      setProductsData(response.data);
    } catch (error) {
      console.error("Error al obtener datos de productos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

  // Delete product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/api/prod_delete${id}`);
      fetchProductsData();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  // Handle input change for creating new product
  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add new product
  const addNewProduct = async () => {
    try {
      await axios.post("/api/prod_save", newProduct);
      setNewProduct({ name: "", stock: "", cost: "" });
      setShowForm(false);
      fetchProductsData();
    } catch (error) {
      console.error("Error al agregar nuevo producto:", error);
    }
  };

  // Handle input change for editing product
  const handleEditProductChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update product
  const updateProduct = async () => {
    try {
      await axios.put(`/api/prod_update/${editProduct.id}`, editProduct);
      setShowEditForm(false);
      fetchProductsData();
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  // Render table with products data
  const renderTable = () => {
    if (Array.isArray(productsData) && productsData.length > 0) {
      return (
        <table className="products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Stock</th>
              <th>Costo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productsData.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.stock}</td>
                <td>${product.cost}</td>
                <td>
                  <button onClick={() => deleteProduct(product.id)} className="delete-button">
                    Eliminar
                  </button>
                  <button
                    onClick={() => {
                      setEditProduct(product);
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
    <div className="products-container">
      <h2>Información de los Productos</h2>
      <button onClick={() => setShowForm(true)} className="add-button">
        Nuevo Producto
      </button>

      {loading ? <div>Cargando datos...</div> : renderTable()}

      {/* Modal para agregar nuevo producto */}
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Agregar nuevo producto</h3>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleNewProductChange}
              placeholder="Nombre del producto"
            />
            <input
              type="number"
              name="stock"
              value={newProduct.stock}
              onChange={handleNewProductChange}
              placeholder="Stock"
            />
            <input
              type="number"
              name="cost"
              value={newProduct.cost}
              onChange={handleNewProductChange}
              placeholder="Costo"
              step="0.01"
            />
            <div className="modal-buttons">
              <button onClick={addNewProduct} className="add-button">
                Agregar
              </button>
              <button onClick={() => setShowForm(false)} className="cancel-button">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar producto */}
      {showEditForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Editar producto</h3>
            <input
              type="text"
              name="name"
              value={editProduct.name}
              onChange={handleEditProductChange}
              placeholder="Nombre del producto"
            />
            <input
              type="number"
              name="stock"
              value={editProduct.stock}
              onChange={handleEditProductChange}
              placeholder="Stock"
            />
            <input
              type="number"
              name="cost"
              value={editProduct.cost}
              onChange={handleEditProductChange}
              placeholder="Costo"
              step="0.01"
            />
            <div className="modal-buttons">
              <button onClick={updateProduct} className="add-button">
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

export default Products;