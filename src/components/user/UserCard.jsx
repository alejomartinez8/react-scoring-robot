import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ auth, onDelete, loading }) => {
  return (
    <div className="card shadow my-4">
      <div className="card-body">
        <div className="row">
          <div className="col">
            <div className="row">
              <p className="col-md-3 text-primary">Nombre:</p>
              <p className="col-md-6">
                {auth.firstName} {auth.lastName}
              </p>
            </div>

            <div className="row">
              <p className="col-md-3 text-primary">Email:</p>
              <p className="col-md-6">{auth.email}</p>
            </div>

            <div className="row">
              <p className="col-md-3 text-primary">Institución Educativa:</p>
              <p className="col-md-6">{auth.institution}</p>
            </div>

            <div className="row">
              <p className="col-md-3 text-primary">Ciudad:</p>
              <p className="col-md-6">{auth.city}</p>
            </div>

            <div className="row">
              <p className="col-md-3 text-primary">País:</p>
              <p className="col-md-6">{auth.country}</p>
            </div>

            <div className="row">
              <p className="col-md-3 text-primary">Acerca de mí:</p>
              <p className="col-md-6">{auth.bio}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card-footer">
        <Link to={`/user/edit/${auth.id}`} className="btn btn-primary">
          <i className="fas fa-user"></i> Editar Perfil
        </Link>
        <button
          onClick={onDelete}
          type="button"
          className="btn btn-danger mx-1"
          disabled={loading}
        >
          {loading ? (
            <span className="spinner-border spinner-border-sm m-1"></span>
          ) : (
            <i className="fas fa-user-minus"></i>
          )}{" "}
          Eliminar Cuenta
        </button>
      </div>
    </div>
  );
};

export default UserCard;
