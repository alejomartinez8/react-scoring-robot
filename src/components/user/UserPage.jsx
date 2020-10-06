import React, { Fragment } from "react";
import { connect } from "react-redux";
import { deleteUser } from "../../redux/actions/user.actions";
import { Link } from "react-router-dom";

const UserPage = ({ auth: { userAuth, loading } }) => {
  const onDelete = () => {
    deleteUser(userAuth.id);
  };

  return (
    <Fragment>
      <div className="card  my-4">
        <div className="card-header">
          <h2 className="text-primary">
            <i className="fas fa-user"></i> Perfil
          </h2>
        </div>
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
          <Link to={`/user/edit/${userAuth._id}`} className="btn btn-primary">
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
    </Fragment>
  );
};

const mapSateToProps = (state) => ({
  auth: state.auth,
});

const actionCreator = {
  deleteUser,
};

export default connect(mapSateToProps, actionCreator)(UserPage);
