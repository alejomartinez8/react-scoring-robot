import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../redux/actions/user.actions';

const Navbar = ({ isAuth, logout }) => {
  const authLinks = (
    <Fragment>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user' />
          {'  '}
          <span className='hide-sm'> Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='/'>
          <i className='fas fa-sign-out-alt' />
          <span className='hide-sm'>Salir</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/user/register'>Registro</Link>
        <Link to='/user/login'>Ingreso</Link>
      </li>
    </Fragment>
  );

  return (
    <nav className='navbar navbar-dark bg-dark'>
      <Link className='navbar-brand' to='/'>
        <i className='fas fa-robot'></i>
        <span> Scoring-Robot</span>
      </Link>
      <ul className='mb-0'>
        <li>
          <Link to='/events'>
            <i className='fas fa-calendar-alt'></i> {'  '}
            <span>Eventos</span>
          </Link>
        </li>
        {isAuth ? authLinks : guestLinks}
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  isAuth: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, { logout })(Navbar);
