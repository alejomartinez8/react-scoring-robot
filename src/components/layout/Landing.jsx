import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Fragment>
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">
              {/* <i className='fas fa-trophy'></i> */}
              <i className="fas fa-robot"></i> Scoring-Robot
            </h1>
            <p className="lead">
              Plataforma de sistema de puntajes para competencias de robótica
              educativa
            </p>

            <div className="buttons m-1">
              <Link to="/events" className="btn btn-primary">
                <i className="fas fa-calendar"></i> Ver Eventos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Landing;
