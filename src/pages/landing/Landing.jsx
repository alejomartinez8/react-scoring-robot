import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>
            {/* <i className='fas fa-trophy'></i> */}
            <i className='fas fa-robot'></i> Scoring-Robot
          </h1>
          <p className='lead'>
            Plataforma de sistema de puntajes para competencias de robótica educativa
          </p>

          <div className='buttons m-1'>
            <Link to='/events' className='btn btn-primary'>
              Ver Eventos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
