import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ userAuth, onDelete, loading }) => {
  return (
    <section>
      <h2 className="text-primary my-3">Perfil</h2>
      <div className="card shadow">
        <div className="card-body">
          <div className="row">
            <div className="col">
              <div className="row">
                <p className="col-md-3 text-primary">Nombre:</p>
                <p className="col-md-6">
                  {userAuth.firstName} {userAuth.lastName}
                </p>
              </div>

              <div className="row">
                <p className="col-md-3 text-primary">Email:</p>
                <p className="col-md-6">{userAuth.email}</p>
              </div>

              <div className="row">
                <p className="col-md-3 text-primary">Institución Educativa:</p>
                <p className="col-md-6">{userAuth.institution}</p>
              </div>

              <div className="row">
                <p className="col-md-3 text-primary">Ciudad:</p>
                <p className="col-md-6">{userAuth.city}</p>
              </div>

              <div className="row">
                <p className="col-md-3 text-primary">País:</p>
                <p className="col-md-6">{userAuth.country}</p>
              </div>

              <div className="row">
                <p className="col-md-3 text-primary">Acerca de mí:</p>
                <p className="col-md-6">{userAuth.bio}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer">
          <Link to={`/user/edit/${userAuth.id}`} className="btn btn-outline-primary">
            <i className="fas fa-user"></i> Editar Perfil
          </Link>
          <button
            onClick={onDelete}
            type="button"
            className="btn btn-outline-danger mx-1"
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
    </section>
  );
};

export default UserCard;
