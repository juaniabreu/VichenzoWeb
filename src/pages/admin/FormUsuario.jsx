import React, { useState } from 'react'
import "./FormUsuario.css"
function FormUsuario() {
  const [newUsuario,setNewUsuario]=useState({})
  
  const handleSubmit=()=>{

  }

  return (
    <div className="formulario-usuario-container">
      <form className="formulario-usuario" onSubmit={handleSubmit}>
        <input
          className="formulario-usuario-input"
          type="text"
          name="usuario"
          id="usuario"
          placeholder="Usuario"
        />
        <input
          className="formulario-usuario-input"
          type="password"
          placeholder="Contraseña"
        />
        <input
          className="formulario-usuario-input"
          type="text"
          placeholder="CUIT"
        />
        <input
          className="formulario-usuario-input"
          type="text"
          placeholder="Razón Social"
        />
        <div className="formulario-usuario-botones">
          <button className="formulario-usuario-boton activar">Activar usuario</button>
          <button className="formulario-usuario-boton cancelar" type="button">Cancelar</button>
        </div>
      </form>
    </div>
  )
}

export default FormUsuario
