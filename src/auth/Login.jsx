import React, { useState, useContext,useEffect} from "react";
import LoginService from "./LoginService";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";
import "./Login.css"

function Login() {
  const{login} = useContext(AuthContext)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(()=>{
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    
  },[])

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    console.log(password,username)
    try {
      const response = await LoginService.login({username,password,});
      login(response.jwt)
      setUsername("");
      setPassword("");
      
    
    } catch (e) {
      alert("Wrong Credentials");
    }
  };
  

  return (
    <div className="login-container">
    <h1>Vichenzo</h1>
    <form onSubmit={handleLoginSubmit}>
      <input
        type="text"
        value={username}
        name="Username"
        placeholder="Usuario"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type="password"
        value={password}
        name="Password"
        placeholder="Contraseña"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button type="submit">Iniciar sesión</button>
    </form>
  </div>
  );
}

export default Login;
