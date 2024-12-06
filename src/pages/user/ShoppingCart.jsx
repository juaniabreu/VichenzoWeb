import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../../services/CartContext";
import axios from "axios";
import "./ShoppingCart.css"


function ShoppingCart() {
  const { cart } = useContext(CartContext);
  const [total, setTotal] = useState(
    cart.reduce((sum, producto) => sum + producto.precio * producto.quantity, 0)
  );

  // Estados para los select
  const [cuit,setCuit]=useState("")
  const [razonSocial,setRazonSocial]=useState("")
  const [tipoEnvio, setTipoEnvio] = useState("");
  const [formaPago, setFormaPago] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    if (name === "tipoEnvio") {
      setTipoEnvio(value);
    } else if (name === "formaPago") {
      setFormaPago(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear objeto de venta
    const venta = {
      razonSocial,
      cuit,
      total,
      tipoEnvio,
      formaPago,
      productos: cart.map((item) => ({
        producto: {
          id: item.id,
        },
        cantidad: item.quantity,
      })),
    };

    console.log(venta); // Ver el objeto de venta antes de enviarlo

    try {
      const response = await axios.post("http://localhost:8080/ventas", venta);
      alert("Venta realizada con éxito");
    } catch (error) {
      console.error("Error al realizar la venta", error);
    }
  };
  return (
    <div className="formulario-container">
    <form className="formulario" onSubmit={handleSubmit}>
      <input
        className="input-text"
        type="text"
        placeholder="Razón social"
        name="razonsocial"
        value={razonSocial}
        onChange={handleInputChange}
        required
      />
      <input
        className="input-text"
        type="text"
        placeholder="CUIT"
        name="cuit"
        value={cuit}
        onChange={handleInputChange}
        required
      />
      <select
        className="select-field"
        name="formaPago"
        value={formaPago}
        onChange={handleSelectChange}
        required
      >
        <option value="">Forma de pago</option>
        <option value="efectivo">Efectivo</option>
        <option value="transferencia">Transferencia</option>
      </select>
      <select
        className="select-field"
        name="tipoEnvio"
        value={tipoEnvio}
        onChange={handleSelectChange}
        required
      >
        <option value="">Tipo de envío</option>
        <option value="local">Retiro por local</option>
        <option value="domicilio">Envío a domicilio</option>
      </select>
  
      {tipoEnvio === "domicilio" ? (
        <div className="envio-domicilio">
          <select className="select-field" name="localidad" required>
            <option value="">Selecciona localidad</option>
            <option value="zonaa">Zona A</option>
            <option value="zonab">Zona B</option>
          </select>
          <input className="input-text" type="text" name="direccion" placeholder="Dirección" required />
        </div>
      ) : null}
  
      <input
        className="input-text"
        type="tel"
        name="telefono"
        placeholder="Teléfono"
        required
      />
      <div className="productos-seleccionados">
        <h3>Productos seleccionados</h3>
        <ul>
          {cart.map((producto) => (
            <li key={producto.id} className="producto-item">
              {producto.nombre} - Cantidad: {producto.quantity}
              <div className="botones-cantidad">
                <button className="btn-cantidad">-</button>
                <button className="btn-cantidad">+</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <h3 className="total">Total: ${total}</h3>
  
      <button className="btn-submit" type="submit">
        Confirmar Pago
      </button>
    </form>
  </div>
  
  );
}

export default ShoppingCart;
