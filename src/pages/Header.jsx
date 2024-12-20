import React, { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Header.css"
import { AuthContext } from "../auth/AuthContext";


function Header() {
  const {user,logout} = useContext(AuthContext)
  return (
    <nav className="header-nav">
      <ul className="nav-list">
        <li>
          <Link to={"/productos"} className="nav-link">Productos</Link>
        </li>
        {user.authorities.includes("ROLE_ADMIN") && (
          <li>
            <Link to={"/admin"} className="nav-link">Administrar</Link>
          </li>
        )}
        <li>
          <Link to={"/checkout"}>
            <img src="/img/carrito.png" alt="carrito" className="nav-icon" />
          </Link>
        </li>
        {localStorage.getItem("jwt") && (
          <li>
            <img
              src="/img/logout.png"
              alt="logout"
              className="nav-icon"
              onClick={logout}
            />
          </li>
        )}
      </ul>
    </nav>
  );
  
}

export default Header;
