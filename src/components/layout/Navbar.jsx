import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { authActions } from "../../redux/actions/";

const Navbar = ({ isAuth, role, logout }) => {
  const authLinks = (
    <Fragment>
      <li>
        <Link to="/profile">
          <i className="fas fa-user" />
          {"  "}
          <span className="hide-sm"> Perfil</span>
        </Link>
      </li>
      {role === "Admin" && (
        <li>
          <Link to="/admin">
            <i className="fas fa-cog" />
            {"  "}
            <span className="hide-sm"> Dashboard</span>
          </Link>
        </li>
      )}
      <li>
        <Link onClick={logout} to="/">
          <i className="fas fa-sign-out-alt" />
          <span className="hide-sm">Salir</span>
        </Link>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/user/login">
          <i className="fas fa-user"></i> <span>Ingreso</span>
        </Link>
      </li>
    </Fragment>
  );

  return (
    <nav className="navbar navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        <i className="fas fa-robot"></i>
        <span> Scoring-Robot</span>
      </Link>
      <div>
        <ul className="mb-0">
          <li>
            <Link to="/events">
              <i className="fas fa-calendar-alt"></i> <span>Eventos</span>
            </Link>
          </li>
          {isAuth ? authLinks : guestLinks}
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  role: PropTypes.string.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  role: state.auth.userAuth.role,
});

const actionCreators = {
  logout: authActions.logout,
};

export default connect(mapStateToProps, actionCreators)(Navbar);
