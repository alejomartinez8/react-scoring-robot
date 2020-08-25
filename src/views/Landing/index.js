import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Competencias Robótica Pygmalion</h1>
          <p className='lead'>
            Plataforma de sistema de puntajes para competencias de robótica
            educativa
          </p>
          <div className='buttons'>
            <Link to='/register' class='btn btn-primary'>
              Registrarse
            </Link>
            <Link to='/login' class='btn btn-light'>
              Ingresar
            </Link>
          </div>
          <div className='buttons m-1'>
            <Link to='/events' class='btn btn-primary'>
              Ver Eventos
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Landing
