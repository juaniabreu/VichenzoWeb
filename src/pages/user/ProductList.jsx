import React, { useContext, useEffect } from "react";
import { ProductContext } from "../../services/ProductContext";
import { CartContext, CartProvider } from "../../services/CartContext";
import "./ProductList.css"

function ProductList() {
  const { productosActivos, total, setTotal, cantProductos, setCantProudcots } =
    useContext(ProductContext);
    const {cart,setCart} = useContext(CartContext)

  useEffect(() => {}, []);

  
  function addToCart(producto) {
    const productoPresente = cart.findIndex((item) => item.id === producto.id);
    if (productoPresente >= 0) {
      const newCart = structuredClone(cart);
      newCart[productoPresente].quantity += 1;
      setCart(newCart);
    } else {
      setCart((prevState) => [
        ...prevState,
        {
          ...producto,
          quantity: 1,
        },
      ]);
    }
  }

  return (
<div className="productos-container">
  <div className="productos-grid">
    {productosActivos.map((producto) => (
      <div className="producto-card" key={producto.id}>
        <img className="producto-imagen" src="/img/noquis-al-huevo.jpg" alt={producto.nombre} />
        <h1 className="producto-nombre">{producto.nombre}</h1>
        <h2 className="producto-precio">${producto.precio}</h2>
        <button
          className="producto-boton"
          onClick={() => addToCart(producto)}
        >
          Agregar
        </button>
      </div>
    ))}
  </div>
</div>

  );
}

export default ProductList;
