import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
import {Navigate, useNavigate} from 'react-router-dom'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("jwt");
    if (savedToken) {
      try {
        const decodedUser = jwtDecode(savedToken);
        setToken(savedToken);
        setUser(decodedUser);
      } catch (e) {
        console.error("Invalid token ", e);
        localStorage.removeItem("jwt");
      }
    }
  }, []);

  const login = (jwt)=>{
    localStorage.setItem("jwt",jwt);
    setToken(jwt)
    const decodedUser=jwtDecode(jwt)
    setUser(decodedUser)
  }
  const logout=()=>{
    localStorage.removeItem("jwt")
    setToken(null)
    setUser(null)
    return <Navigate to={"/"}/>
  }

  return(
    <AuthContext.Provider value={{user,token,login,logout}}>
        {children}
    </AuthContext.Provider>
  )
};
