import axios from "axios";
import { createContext, useState, useEffect } from "react";
import api from "./api";

export const ProductContext = createContext();

export const ProductoProvider = ({ children }) => {
  const [total, setTotal] = useState(0);
  const [cantProductos, setCantProductos] = useState(0);
  const [allProductos, setAllProductos] = useState([]);
  const [productosActivos, setProductosActivos] = useState([]);
  
  const getallProductos = async () => {
   try{
    const response = await api.get("/api/productos")
    setAllProductos(response.data)
   }catch(error){
    console.error("Error al obtener productos ", error)
   }
  };
  const getallProductosActivos = async () => {
    try{
      const response = await api.get("/api/productos/getactive")
      setProductosActivos(response.data)
    }catch(error){
      console.error("Error al obtener productos ", error)
    }
  
    };
  const saveSell = async(venta)=>{
    try{
        const response = await api.post("/api/ventas",venta)
        alert("Producto creado ", response.data)
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
        getallProductos,
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
