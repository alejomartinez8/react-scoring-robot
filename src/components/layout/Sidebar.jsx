import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div id="sidebar_nav">
      <div className="sidebar bg-dark">
        <div className="sidebar-menu">
          <div className="nav">
            <Link className="nav-link" to="/admin/">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer"></i> Dashboard
              </div>
            </Link>
            <Link className="nav-link" to="/admin/events">
              <div className="sb-nav-link-icon">
                <i className="fas fa-calendar"></i> Eventos
              </div>
            </Link>
            <Link className="nav-link" to="/admin/challenges">
              <div className="sb-nav-link-icon">
                <i className="fas fa-trophy"></i> Retos
              </div>
            </Link>

            <Link className="nav-link" to="/admin/users">
              <div className="sb-nav-link-icon">
                <i className="fas fa-user"></i> Usuarios
              </div>
            </Link>

            <Link className="nav-link" to="/admin/teams">
              <div className="sb-nav-link-icon">
                <i className="fas fa-users"></i> Equipos
              </div>
            </Link>

            <Link className="nav-link" to="/user">
              <div className="sb-nav-link-icon">
                <i className="fas fa-user"></i> Perfil
              </div>
            </Link>

            <Link className="nav-link" to="/admin/configuration">
              <div className="sb-nav-link-icon">
                <i className="fas fa-cog"></i> Configuración
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
