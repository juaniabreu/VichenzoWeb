import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../../services/CartContext";
import axios from "axios";
import "./ShoppingCart.css"
import api from "../../services/api";


function ShoppingCart() {
  const { cart,setCart} = useContext(CartContext);
  const [total, setTotal] = useState(
    cart.reduce((sum, producto) => sum + producto.precio * producto.quantity, 0)
  );

  // Estados para los select
  const [cuit,setCuit]=useState("")
  const [telefono,setTelefono]=useState("")
  const [razonSocial,setRazonSocial]=useState("")
  const [tipoEnvio, setTipoEnvio] = useState("");
  const [formaPago, setFormaPago] = useState("");
  const zonasDeEntrega = [
    "Belgrano",
    "Coghlan",
    "Núñez",
    "Saavedra",
    "Colegiales",
    "Caballito",
    "Almagro",
    "Villa crespo",
    "Villa urquiza",
    "Palermo",
    "Villa ortuzar",
    "Chacarita",
    "Recoleta"
  ];

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    if (name === "tipoEnvio") {
      setTipoEnvio(value);
    } else if (name === "formaPago") {  
      setFormaPago(value);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "cuit") {
      setCuit(value);
    } else if (name === "razonsocial") {
      setRazonSocial(value);
    }else if(name === "telefono"){
      setTelefono(value)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear objeto de venta
    const venta = {
      razonSocial,
      cuit,
      total,
      telefono,
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
      const response = await api.post("api/ventas", venta);
      setCuit("")
      setFormaPago("")
      setRazonSocial("")
      setTipoEnvio("")
      setTelefono("")
      setCart([])
      alert("Venta realizada con éxito");
    } catch (error) {
      console.error("Error al realizar la venta", error);
    }
  };
  return (
    <div className="formulario-container">
    <form className="formulario" onSubmit={handleSubmit}>
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
      {formaPago=== "transferencia" ?(<div><input
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
    /></div>):null}
      
  
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
            {zonasDeEntrega.map((zona,index)=>(
              <option key={index} value={zona}>
                {zona}
              </option>
            ))}
          </select>
          <input className="input-text" type="text" name="direccion" placeholder="Dirección, verifique que se encuentre dentro de la zona establecida" required />
        </div>
      ) : null}
  
      <input
        className="input-text"
        type="tel"
        name="telefono"
        value={telefono}
        onChange={handleInputChange}
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
