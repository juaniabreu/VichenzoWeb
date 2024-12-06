import React, { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Header.css"
import { AuthContext } from "../auth/AuthContext";


function Header() {
  const {user,logout} = useContext(AuthContext)
  return (
    <nav>
      <li>
        <Link to={"/productos"}>Productos</Link>
      </li>
      <li>
        <Link to={"/checkout"}>Carrito</Link>
      </li>
      { user.authorities.includes("ROLE_ADMIN")&&
      <li>
        <Link to={"/admin"}>Adminstrar</Link>
      </li>
      }
      {localStorage.getItem("jwt") &&
      <li>
        <button onClick={logout}>logout</button>
      </li>}
    </nav>
  );
}

export default Header;
