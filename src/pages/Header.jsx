import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"

function Header() {
  return (
    <nav>
      <li>
        <Link to={"/productos"}>Productos</Link>
      </li>
      <li>
        <Link to={"/checkout"}>Carrito</Link>
      </li>
      <li>
        <Link to={"/admin"}>Adminstrar</Link>
      </li>
    </nav>
  );
}

export default Header;
