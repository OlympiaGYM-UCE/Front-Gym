/*import React from "react";*/
import { Routes, Route } from "react-router-dom";
import Inicio from "./pages/inicio/inicio";
import Empresas from "./pages/empresas/empresas";
import Office from "./pages/office/office";
import Rutinas from "./pages/rutinas/rutinas";
import Layout from "./components/Layout";
import BlankLayout from "./components/BlankLayout";
import Memberships from "./pages/memberships/memberships";
import About from "./pages/about/about";
import Menu from "./pages/menu/menu"; // Ya está en tu proyecto
import Products from "./pages/products/products";
import "./App.css";
import Customers from "./pages/customers/customers";
import ProtectedRoute from "./pages/ProtectedRoute";
import Memberlist from "./pages/memberlist/memberlist"
import Consultar from "./pages/consultar/consultar";





function App() {
  const handleMenuClick = (option) => {
    // Aquí puedes agregar la lógica para redirigir o actualizar la vista
    console.log(`Opción seleccionada: ${option}`);  // Esto debería mostrar lo que se pasa desde el botón del menú
  };

  return (
    <>
      <Routes>
        {/* Rutas con el layout del menú a la izquierda */}

        {/* Rutas protegidas */}
      <Route element={<ProtectedRoute />}>

        {/* Ruta para mostrar solo el menú sin contenido adicional */}
        <Route path="/menu" element={
  <BlankLayout>
    <Menu handleMenuClick={handleMenuClick} />  {/* Asegúrate de que handleMenuClick se pase correctamente */}
  </BlankLayout>
} />
 
        <Route path="/empresas" element={
          <BlankLayout>
            <Empresas />
          </BlankLayout>
        } />

<Route path="/office" element={
          <BlankLayout>
            <Office />
          </BlankLayout>
        } />

<Route path="/products" element={
          <BlankLayout>
            <Products />
          </BlankLayout>
        } />

<Route path="/customers" element={
          <BlankLayout>
            <Customers />
          </BlankLayout>
        } />

<Route path="/memberlist" element={
          <BlankLayout>
            <Memberlist />
          </BlankLayout>
        } />

</Route>



        <Route path="/rutinas" element={
          <Layout>
            <Rutinas />
          </Layout>
        } />

<Route path="/consultar" element={
          <Layout>
            <Consultar />
          </Layout>
        } />

<Route path="/about" element={
          <Layout>
            <About />
          </Layout>
        } />

<Route path="/memberships" element={
          <Layout>
            <Memberships />
          </Layout>
        } />

        {/* Página de inicio sin el menú (si lo prefieres) */}
        <Route path="/" element={
          <Layout>
            <Inicio />
          </Layout>
        } />

        

      </Routes>
    </>
  );
}

export default App;
