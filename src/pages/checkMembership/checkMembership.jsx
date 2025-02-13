import React from 'react';
import './CheckMembership.css';

function CheckMembership({ isOpen, onClose }) {
  if (!isOpen) return null;  // Si isOpen es false, el modal no se renderiza

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Consultar Membresía</h2>
          <button className="close-button" onClick={onClose}>×</button> {/* Botón para cerrar el modal */}
        </div>
        <div className="modal-body">
          {/* Aquí irá el contenido de tu modal */}
          <p>Contenido del modal de membresía...</p>
        </div>
      </div>
    </div>
  );
}

export default CheckMembership;