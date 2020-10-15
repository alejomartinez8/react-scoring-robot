import React from "react";
import { connect } from "react-redux";
import { authActions } from "../../redux/actions";

const Topbar = ({ isAuth, role, logout, toggleSidenav, toggleSidenavAction }) => {
  return (
    <nav className="topbar navbar navbar-expand navbar-light bg-light">
      <button
        className="btn btn-link btn-sm"
        href="#"
        onClick={() => {
          toggleSidenavAction(!toggleSidenav);
        }}
      >
        <i className="fas fa-bars"></i>
      </button>
      <a className="navbar-brand" href="/">
        <h3 className="text-secondary">Scoring-Robot</h3>
      </a>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  role: state.auth.userAuth.role,
});

const actionCreators = {
  logout: authActions.logout,
};

export default connect(mapStateToProps, actionCreators)(Topbar);
