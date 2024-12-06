import React, { useContext, useState } from 'react'
import "./Home.css"
import Login from '../auth/Login'
import { AuthContext } from '../auth/AuthContext';
function Home() {
  const {user} = useContext(AuthContext);
  return (
    <div>
         <section className="hero">
        <div className="hero-content">
          <h1>¡Bienvenido a TiendaOnline!</h1>
          <p>Calidad, tradición y pasión por las pastas artesanales.</p>
        </div>
        
      </section>
{!user &&
      <Login/>
    }
      <section className="about" id="nosotros">
        <h2>Sobre nosotros</h2>
        <p>
          Somos una fábrica de pastas artesanales con más de 20 años de experiencia, 
          comprometidos con brindar productos de la más alta calidad. Nuestro equipo 
          se esfuerza en crear pastas únicas, hechas con ingredientes frescos y un 
          toque casero que encanta a todos nuestros clientes.
        </p>
      </section>

      <section className="contact" id="contacto">
        <h2>Contacto</h2>
        <p>¿Tienes preguntas o necesitas más información? ¡Contáctanos!</p>
        <ul>
          <li><strong>Teléfono:</strong> +123 456 789</li>
          <li><strong>Email:</strong> contacto@tiendaonline.com</li>
          <li><strong>Dirección:</strong> Calle Ejemplo 123, Ciudad, País</li>
        </ul>
      </section>
    </div>
  )
}

export default Home
