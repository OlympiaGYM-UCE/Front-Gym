import React from "react"
import { useNavigate } from "react-router-dom"
import "./inicio.css"

function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="inicio">
      <div className="hero-content">
        <div className="hero-text">
          <h1>
            Today is the perfect day to start
            <span className="highlight-text"> your best version</span>
          </h1>
          <button 
            className="join-button" 
            onClick={() => navigate('/menu')}
          >
            Iniciar sesion hola
          </button>
        </div>
      </div>
    </div>
  )
}

export default Inicio