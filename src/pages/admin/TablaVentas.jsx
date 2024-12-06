import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TablaVentas.css"
import api from "../../services/api";
function TablaVentas() {

  const [allVentas, setAllVentas] = useState([]);

  const getallVentas = async () => {
    try{
      const response = await api.get("/api/ventas/getall")
      setAllVentas(response.data)
    }catch(error){
      console.error("ERROR al obtener ventas ", error)
    }
  };

  useEffect(() => {
    getallVentas();
  },[]);
   return (
    <div className="productos-table-container">
      <h2 className="productos-title">Lista de ventas</h2>
      <table className="productos-table">
        <thead>
          <tr>
            <th>Razon social</th>
            <th>CUIT</th>
            <th>Productos</th>
            <th>Total</th>
            <th>Tipo de entrega</th>
            <th>Forma de pago</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {allVentas.length > 0 ? (
            allVentas.map((venta) => (
              <tr key={venta.id}>
                <td>{venta.razonSocial}</td>
                <td>{venta.cuit}</td>
                <td>
                  <ul>
                    {venta.productos.map((producto) => (
                      <li key={producto.id}>
                        {producto.producto.nombre} - Cantidad: {producto.cantidad}
                      </li>
                    ))}
                  </ul>
                </td>

                <td>${venta.total}</td>
                <td>{venta.tipoEnvio}</td>
                <td>{venta.formaPago}</td>
                <td>{venta.fecha}</td>
                <td>{venta.estado}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-productos">
                No hay ventas en proceso
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TablaVentas;
