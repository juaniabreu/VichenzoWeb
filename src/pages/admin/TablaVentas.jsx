import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TablaVentas.css"
import api from "../../services/api";
function TablaVentas() {
  const [allVentas, setAllVentas] = useState([]);
  const [filter, setFilter] = useState("Pendiente");

  const getAllVentas = async () => {
    try {
      const response = await api.get("/api/ventas/getall");
      setAllVentas(response.data);
    } catch (error) {
      console.error("ERROR al obtener ventas", error);
    }
  };

  const updateVentaEstado = async (id, nuevoEstado) => {
    try {
      await api.put(`/api/ventas/update/${id}`, { estado: nuevoEstado });
    } catch (error) {
      console.error("ERROR al actualizar", error);
    }
  };

  const handleEstadoChange = async (id, nuevoEstado) => {
    const nuevasVentas = allVentas.map((venta) =>
      venta.id === id ? { ...venta, estado: nuevoEstado } : venta
    );
    setAllVentas(nuevasVentas);
    await updateVentaEstado(id, nuevoEstado);
  };

  const filtrarVentas = () => {
    return allVentas.filter((venta) => venta.estado === filter);
  };

  useEffect(() => {
    getAllVentas();
  }, []);

  return (
    <div className="productos-table-container">
      <h2 className="productos-title">Lista de ventas</h2>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="filter-select"
      >
        <option value="Pendiente">Pendiente</option>
        <option value="En proceso">En proceso</option>
        <option value="Completado">Completado</option>
        <option value="Cancelado">Cancelado</option>
      </select>
      <table className="productos-table">
        <thead>
          <tr>
            <th>Razón Social</th>
            <th>CUIT</th>
            <th>Teléfono</th>
            <th>Productos</th>
            <th>Total</th>
            <th>Tipo de Entrega</th>
            <th>Forma de Pago</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {filtrarVentas().length > 0 ? (
            filtrarVentas().map((venta) => (
              <tr key={venta.id}>
                <td>{venta.razonSocial}</td>
                <td>{venta.cuit}</td>
                <td>{venta.telefono}</td>
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
                <td>
                  <select
                    value={venta.estado}
                    onChange={(e) => handleEstadoChange(venta.id, e.target.value)}
                    className="estado-select"
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En proceso">En proceso</option>
                    <option value="Completado">Completado</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="no-ventas">
                No hay ventas disponibles para esta categoría
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TablaVentas;