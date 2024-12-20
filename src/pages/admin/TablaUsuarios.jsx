import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../services/api";
function TablaUsuarios() {
  const [users, setUsers] = useState([]);

  const getallUsuarios = async () => {
    try {
      const response = await api.get("/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("ERROR al obtener usuarios ", error);
    }
  };
  const deleteUsuario =async(id)=>{
    try{
      const response = await api.delete(`/api/users/delete/${id}`)

    }catch(error){
      console.error("Error al dar de baja usuario", error)
    }
  }

  const daraltausuario=async(id)=>{
    try{
      const response = await api.put(`/api/users/alta/${id}`)
    }catch(e){
      console.error("Error al dar de alta",e)
    }
  }
useEffect(() => {
  getallUsuarios();
}, []);
return( <div>
  <h2>Lista de usuarios</h2>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Usuario</th>
        <th>Estado</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user)=>(
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.username}</td>

          <td>{user.enabled==true ? "Habilitado":"Deshabilitado"}</td>
          {user.enabled==true && <td><button onClick={()=>{deleteUsuario(user.id)}}>Dar de baja</button></td> }
          

          {user.enabled==false && <td><button onClick={()=>{daraltausuario(user.id)}}>Dar de alta</button></td> }
        </tr>
      ))
      }
    </tbody>
  </table>
</div>)
}

export default TablaUsuarios;
