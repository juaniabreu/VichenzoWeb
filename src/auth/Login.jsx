import React, { useState, useContext,useEffect} from "react";
import LoginService from "./LoginService";
import { jwtDecode } from "jwt-decode";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user,setUser]=useState(null)

  useEffect(()=>{
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    
  },[])
  const handleLogout=()=>{
    setUser(null) 
    window.localStorage.setItem("loggedAppUser",null)
  }

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    console.log(password,username)
    try {
      const user = await LoginService.login({
        username,
        password,
      });
      const decodedToken =jwtDecode(user.jwt)

      console.log(user)

      setUsername("");
      setPassword("");
      setUser(user)
    } catch (e) {
      console.error(e)
      alert("Wrong Credentials");
    }
  };
  window.localStorage.setItem(
    'loggedAppUser', JSON.stringify(user)
  )
  

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
      {user ?
      <button onClick={()=>{handleLogout()}}>logout</button>
        :null
    }
    </div>
  );
}

export default Login;
