import React from "react";
import { connect } from "react-redux";
import { authActions } from "../../redux/actions";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Topbar = ({ isAuth, role, logout, toggleSidenav, toggleSidenavAction }) => {
  let history = useHistory();
  const handleLogout = () => {
    logout();
    history.push("/auth/login");
  };

  return (
    // <nav className="topbar navbar navbar-expand navbar-light bg-light">
    //   <button
    //     className="btn btn-link btn-sm"
    //     href="#"
    //     onClick={() => {
    //       toggleSidenavAction(!toggleSidenav);
    //     }}
    //   >
    //     <i className="fas fa-bars"></i>
    //   </button>
    //   <a className="navbar-brand" href="/">
    //     <h3 className="text-secondary">Scoring-Robot</h3>
    //   </a>
    // </nav>
    <Navbar bg="light" expand="md">
      <Navbar.Brand href="/">
        <h3 className="text-secondary">Scoring-Robot</h3>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Inicio</Nav.Link>
          <Nav.Link href="/events">Eventos</Nav.Link>
          {role === "Admin" && (
            <NavDropdown title="Admin" id="basic-nav-dropdown">
              <NavDropdown.Item href="/admin">Dashboard</NavDropdown.Item>
              <NavDropdown.Item href="/admin/events">Eventos</NavDropdown.Item>
              <NavDropdown.Item href="/admin/challenges">Retos</NavDropdown.Item>
              <NavDropdown.Item href="/admin/users">Usuarios</NavDropdown.Item>
              <NavDropdown.Item href="/admin/teams">Equipos</NavDropdown.Item>
            </NavDropdown>
          )}
          {isAuth ? (
            <NavDropdown title="Usuario" id="basic-nav-dropdown">
              {role === "User" && (
                <NavDropdown.Item href="/user/teams">Mis Equipos</NavDropdown.Item>
              )}
              <NavDropdown.Item href="/user">Perfil</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#" onClick={handleLogout}>
                Salir
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Link href="/auth/login">Ingreso</Nav.Link>
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
