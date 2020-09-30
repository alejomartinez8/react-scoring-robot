import React from "react";
import { connect } from "react-redux";
import { authActions } from "../../redux/actions";
import { Navbar, Nav } from "react-bootstrap";

const Topbar = ({ isAuth, role, logout }) => {
  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Navbar.Brand href="/">
        <i className="fas fa-robot"></i>
        <span> Scoring-Robot</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="user-nav" />
      <Navbar.Collapse id="user-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/events">
            <i className="fas fa-calendar"></i> Eventos
          </Nav.Link>
          {role === "Admin" && (
            <Nav.Link href="/admin">
              <i className="fas fa-tachometer"></i> Dashboard
            </Nav.Link>
          )}
          {role === "User" && <Nav.Link href="/user/teams">Mis Equipos</Nav.Link>}
          {isAuth && (
            <Nav.Link href="/user">
              <i className="fas fa-user"></i> Perfil
            </Nav.Link>
          )}
          {isAuth ? (
            <Nav.Link onClick={logout}>
              <i className="fas fa-sign-out"></i> Salir
            </Nav.Link>
          ) : (
            <Nav.Link href="/auth/login">
              <i className="fas fa-sign-in"></i> Login
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
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
