import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { authActions, layoutActions } from "../../redux/actions";
import { useMediaQuery } from "react-responsive";
import { useHistory } from "react-router-dom";

const Sidebar = ({ isAuth, role, logout, toggleSidenavAction }) => {
  let history = useHistory();

  const isTabletOrMobileDevice = useMediaQuery({
    query: "(max-device-width: 1224px)",
  });

  const handleClick = () => {
    if (isTabletOrMobileDevice) {
      console.log("toggle Sidenav");
      toggleSidenavAction();
    }
  };

  const handleLogout = () => {
    logout();
    history.push("/auth/login");
  };

  return (
    <div id="sidebar_nav">
      <div className="sidebar bg-dark">
        <div className="sidebar-menu">
          <div className="nav">
            <Link className="nav-link" to="/events" onClick={handleClick}>
              <div className="sb-nav-link-icon">
                <i className="fas fa-calendar"></i> Eventos
              </div>
            </Link>

            {role === "Admin" && (
              <>
                <div className="sidenav-menu-heading">Admin</div>
                <Link className="nav-link" to="/admin/" onClick={handleClick}>
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-tachometer"></i> Dashboard
                  </div>
                </Link>
                <Link className="nav-link" to="/admin/events" onClick={handleClick}>
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-calendar"></i> Eventos
                  </div>
                </Link>
                <Link
                  className="nav-link"
                  to="/admin/challenges"
                  onClick={handleClick}
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-trophy"></i> Retos
                  </div>
                </Link>

                <Link className="nav-link" to="/admin/users" onClick={handleClick}>
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-user"></i> Usuarios
                  </div>
                </Link>

                <Link className="nav-link" to="/admin/teams" onClick={handleClick}>
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-users"></i> Equipos
                  </div>
                </Link>

                <Link
                  className="nav-link"
                  to="/admin/configuration"
                  onClick={handleClick}
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-cog"></i> Configuración
                  </div>
                </Link>
              </>
            )}

            {isAuth ? (
              <>
                <div className="sidenav-menu-heading">Usuario</div>
                {role === "User" && (
                  <Link className="nav-link" to="/user/teams" onClick={handleClick}>
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-users"></i> Mis Equipos
                    </div>
                  </Link>
                )}

                <Link className="nav-link" to="/user" onClick={handleClick}>
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-user"></i> Perfil
                  </div>
                </Link>

                <Link className="nav-link" to="#" onClick={handleLogout}>
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-sign-out"></i> Salir
                  </div>
                </Link>
              </>
            ) : (
              <Link className="nav-link" to="/auth/login" onClick={handleClick}>
                <div className="sb-nav-link-icon">
                  <i className="fas fa-sign-in"></i> Login
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  role: state.auth.userAuth.role,
  toggleSidenav: state.layout.toggleSidenav,
});

const actionCreators = {
  logout: authActions.logout,
  toggleSidenavAction: layoutActions.toggleSidenavAction,
};

export default connect(mapStateToProps, actionCreators)(Sidebar);
