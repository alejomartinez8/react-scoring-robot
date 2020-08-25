import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const isAuth = false;

  const authLinks = (
    <Fragment>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user' />
          {'  '}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <a href='#!'>
          <i className='fas fa-sign-out-alt' />
          {'  '}
          <span className='hide-sm'>Salir</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li className='nav-item mr-sm-2'>
        <Link to='login'>
          <i className='fas fa-sign-in-alt' /> {'  '}
          <span>Ingreso</span>
        </Link>
      </li>
    </Fragment>
  );

  return (
    <nav className='navbar navbar-dark bg-dark'>
      <Link className='navbar-brand mb-0 h1' to='/'>
        <i className='fas fa-trophy'></i>
        <span> Competencias</span>
      </Link>
      <ul>
        <li>
          <Link to='/events'>
            <i class='fas fa-calendar-alt'></i> {'  '}
            <span>Eventos</span>
          </Link>
        </li>
        {isAuth ? authLinks : guestLinks}
      </ul>
    </nav>
  );
};

export default Navbar;
