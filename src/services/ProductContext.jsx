import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export const ProductoProvider = ({ children }) => {
  const [total, setTotal] = useState(0);
  const [cantProductos, setCantProductos] = useState(0);
  const [allProductos, setAllProductos] = useState([]);
  const [productosActivos, setProductosActivos] = useState([]);
  const getallProductos = async () => {
    axios
      .get("http://localhost:8080/api/productos")
      .then((response) => setAllProductos(response.data))
      .catch((error) => console.error(error));
  };
  const getallProductosActivos = async () => {
    axios
      .get("http://localhost:8080/api/productos/getactive")
      .then((response) => setProductosActivos(response.data))
      .catch((error) => console.error(error));
  };
  const saveSell = async(venta)=>{
    try{
    await axios.post("http://localhost:8080/api/ventas", venta)
  }catch(e){
    console.error("Error al realizar la venta ", e)
  }
  }

  useEffect(() => {
    getallProductos();
    getallProductosActivos();
  }, []);
  return (
    <ProductContext.Provider
      value={{
        allProductos,
        setAllProductos,
        total,
        setTotal,
        cantProductos,
        setCantProductos,
        productosActivos,
        setProductosActivos,saveSell
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
