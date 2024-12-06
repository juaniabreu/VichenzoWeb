import React, { useContext, useState } from "react";
import { ProductContext } from "../../services/ProductContext";
import axios from "axios";
import "./TablaProductos.css"
function TablaProductos() {
  const { allProductos } = useContext(ProductContext);

  // Estado para manejar el producto a editar
  const [productoEditado, setProductoEditado] = useState(null);
  const [productoNuevo, setProductoNuevo] = useState(null);

  // Función para manejar los cambios en el formulario de edición
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductoEditado({
      ...productoEditado,
      [name]: value,
    });
  };
  const handleInputChangeNew = (e) => {
    const { name, value } = e.target;
    setProductoNuevo({
      ...productoNuevo,
      [name]: value,
    });
  };

  // Función para actualizar el producto
  const updateProduct = async (productoId, updateProduct) => {
    try {
      await axios.put(
        `http://localhost:8080/producto/update/${productoId}`,
        updateProduct
      );
      alert("Producto actualizado");
      setProductoEditado(null); // Cerrar el formulario después de la actualización
    } catch (error) {
      console.error("Error al actualizar el producto", error);
    }
  };

  const activeProduct = async (productoid, producto) => {
    try {
      await axios.put(
        `http://localhost:8080/producto/active/${productoid}`,
        producto
      );
      alert("El producto ahora se muestra en la lista");
    } catch (error) {
      console.error("Error al actualizar el producto", error);
    }
  };
  const deleteProduct = async (productoid) => {
    try {
      await axios.delete(`http://localhost:8080/producto/delete/${productoid}`);
    } catch (error) {
      console.error("Error al eliminar producto", error);
    }
  };

  const addProduct = async (producto) => {
    try {
      await axios.post(`http://localhost:8080/producto/create`, producto);
      setProductoNuevo(null);
      alert("Producto agregado");
    } catch (error) {
      console.error("Error al agregar producto", error);
    }
  };

  const createProduct = () => {
    setProductoNuevo({
      nombre: "",
      precio: 0,
    });
  };
  // Función que se activa cuando se hace clic en "Editar"
  const editProduct = (producto) => {
    setProductoEditado({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
    });
  };

  return (
    <div className="productos-table-container">
    <button className="productos-agregar-boton" onClick={createProduct}>
      Agregar producto
    </button>
    <h2 className="productos-title">Lista de productos</h2>
    {productoNuevo && (
      <div className="productos-nuevo">
        <h3 className="productos-subtitulo">Agregar producto nuevo</h3>
        <form
          className="productos-formulario"
          onSubmit={(e) => {
            e.preventDefault();
            addProduct(productoNuevo);
          }}
        >
          <input
            className="productos-input"
            type="text"
            name="nombre"
            value={productoNuevo.nombre}
            onChange={handleInputChangeNew}
            required
            placeholder="Nombre"
          />
          <input
            className="productos-input"
            type="number"
            name="precio"
            value={productoNuevo.precio}
            onChange={handleInputChangeNew}
            required
            placeholder="Precio"
          />
          <div className="productos-botones">
            <button className="productos-boton guardar" type="submit">
              Guardar
            </button>
            <button
              className="productos-boton cancelar"
              type="button"
              onClick={() => setProductoNuevo(null)}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    )}
    {productoEditado && (
      <div className="productos-editar">
        <h3 className="productos-subtitulo">Editar Producto</h3>
        <form
          className="productos-formulario"
          onSubmit={(e) => {
            e.preventDefault();
            updateProduct(productoEditado.id, productoEditado);
          }}
        >
          <label>
            Nombre:
            <input
              className="productos-input"
              type="text"
              name="nombre"
              value={productoEditado.nombre}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Precio:
            <input
              className="productos-input"
              type="number"
              name="precio"
              value={productoEditado.precio}
              onChange={handleInputChange}
              required
            />
          </label>
          <input className="productos-input archivo" type="file" />
          <div className="productos-botones">
            <button className="productos-boton actualizar" type="submit">
              Actualizar
            </button>
            <button
              className="productos-boton cancelar"
              type="button"
              onClick={() => setProductoEditado(null)}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    )}
    <table className="productos-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {allProductos.length > 0 ? (
          allProductos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>${producto.precio}</td>
              <td>
                <button
                  className="table-button editar"
                  onClick={() => editProduct(producto)}
                >
                  Editar
                </button>
                <button
                  className="table-button ocultar"
                  onClick={() => deleteProduct(producto.id)}
                >
                  Ocultar
                </button>
                <button
                  className="table-button mostrar"
                  onClick={() => activeProduct(producto.id, producto)}
                >
                  Mostrar
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="no-productos">
              No hay productos disponibles
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
  );
}

export default TablaProductos;
