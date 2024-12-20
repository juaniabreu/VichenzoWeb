import React, { useState } from 'react'
import "./FormUsuario.css"
import api from '../../services/api'
function FormUsuario() {
  const [newUsuario,setNewUsuario]=useState({
    username:'',
    password:'',
    enabled: true,
    accountNotExpired: true,
    accountNotLocked: true,
    credentialNotExpired: true,
    rolesList:[{
      id:2
    }]
  })


  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUsuario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit=async (e)=>{
    e.preventDefault()
    console.log(newUsuario)
    try{
      const response = await api.post("/api/users", newUsuario)
      alert("Usuario creado")
    }catch(error){
      console.error("Error al crear usuario ", error)
    }
  }

  return (
    <div className="formulario-usuario-container">
      <form className="formulario-usuario" onSubmit={handleSubmit}>
        <input
          className="formulario-usuario-input"
          type="text"
          name="username"
          id="username"
          placeholder="Usuario"
          value={newUsuario.username}
          onChange={handleChange}
        />
        <input
          className="formulario-usuario-input"
          type="password"
          name='password'
          id='password'
          placeholder="Contraseña"
          value={newUsuario.password}
          onChange={handleChange}
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
