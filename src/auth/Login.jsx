import React, { useState, useContext,useEffect} from "react";
import LoginService from "./LoginService";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";

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
      console.log(response)
      login(response.jwt)
      setUsername("");
      setPassword("");
      
    
    } catch (e) {
      console.error(e)
      alert("Wrong Credentials");
    }
  };
  

  return (
    <div>
      <h1>Vichenzo</h1>
      <form onSubmit={handleLoginSubmit}>
        <input
          type="text"
          value={username}
          name="Username"
          placeholder="usuario"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <br />
        <input
          type="password"
          value={password}
          name="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="contraseña"
        />
        <br />
        <button> Iniciar sesion</button>
      </form>
    </div>
  );
}

export default Login;
