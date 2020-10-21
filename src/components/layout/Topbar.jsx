import React from "react";
import { connect } from "react-redux";
import { authActions } from "../../redux/actions";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Topbar = ({
  isAuth,
  userAuth,
  role,
  logout,
  toggleSidenav,
  toggleSidenavAction,
}) => {
  let history = useHistory();
  const handleLogout = () => {
    logout();
    history.push("/auth/login");
  };

  console.log(userAuth);

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
          {/* <Nav.Link href="/">Inicio</Nav.Link> */}
          <Nav.Link href="/events">
            <i className="fas fa-calendar"></i> Eventos
          </Nav.Link>
          {role === "Admin" && (
            <NavDropdown
              title={
                <div style={{ display: "inline-block" }}>
                  <i className="fas fa-cog"></i> Admin
                </div>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/admin">
                <i className="fas fa-tachometer"></i> Dashboard
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/admin/events">
                <i className="fas fa-calendar"></i> Eventos
              </NavDropdown.Item>
              <NavDropdown.Item href="/admin/challenges">
                <i className="fas fa-trophy"></i> Retos
              </NavDropdown.Item>
              <NavDropdown.Item href="/admin/users">
                <i className="fas fa-user"></i> Usuarios
              </NavDropdown.Item>
              <NavDropdown.Item href="/admin/teams">
                <i className="fas fa-users"></i> Equipos
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
        <Nav className="justify-content-end mr-4">
          {isAuth ? (
            <NavDropdown
              title={
                <div style={{ display: "inline-block" }}>
                  <i className="fas fa-user-circle"></i>
                  {" Usuario "}
                  <strong>{isAuth && userAuth.firstName}</strong>
                </div>
              }
              id="basic-nav-dropdown"
            >
              {role === "User" && (
                <NavDropdown.Item href="/user/teams">Mis Equipos</NavDropdown.Item>
              )}
              <NavDropdown.Item href="/user">
                <i className="fas fa-id-card"></i> Perfil
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#" onClick={handleLogout}>
                <i className="fas fa-sign-out"></i> Salir
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Link href="/auth/login">
              <i className="fas fa-sign-in"></i> Ingreso
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  userAuth: state.auth.userAuth,
  role: state.auth.userAuth.role,
});

const actionCreators = {
  logout: authActions.logout,
};

export default connect(mapStateToProps, actionCreators)(Topbar);
