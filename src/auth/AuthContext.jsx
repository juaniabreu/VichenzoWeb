import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem("jwt");

    if (savedToken) {
      try {
        const decodedUser = jwtDecode(savedToken);
        const expirationTime = decodedUser.exp * 1000;
        const currentTime = Date.now();

        if (currentTime >= expirationTime) {
          // Token expirado
          handleLogout();
        } else {
          // Token válido
          setToken(savedToken);
          setUser(decodedUser);

          // Configura un timer para cerrar sesión automáticamente cuando expire el token
          const timeUntilExpiration = expirationTime - currentTime;
          setTimeout(() => handleLogout(), timeUntilExpiration);
        }
      } catch (e) {
        handleLogout();
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setToken(null);
    setUser(null);
    navigate("/"); // Redirige a la página de inicio/login
  };

  const login = (jwt) => {
    localStorage.setItem("jwt", jwt);
    setToken(jwt);
    const decodedUser = jwtDecode(jwt);
    setUser(decodedUser);

    // Configura un timer para el nuevo token
    const expirationTime = decodedUser.exp * 1000;
    const currentTime = Date.now();
    const timeUntilExpiration = expirationTime - currentTime;
    setTimeout(() => handleLogout(), timeUntilExpiration);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
