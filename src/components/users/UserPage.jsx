import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { userActions, authActions } from "../../redux/actions";
import { Link, Redirect } from "react-router-dom";
import ConfirmModal from "../layout/ConfirmModal";

const UserPage = ({
  auth: { isAuth, userAuth, loading },
  user,
  deleteUser,
  clearUser,
  logout,
}) => {
  const [showConfirm, SetShowConfirm] = useState(false);

  const handleDeleteUser = (e) => {
    e.preventDefault();
    SetShowConfirm(true);
  };

  const handleClose = () => {
    SetShowConfirm(false);
  };

  const handleConfirm = (id) => {
    SetShowConfirm(false);
    deleteUser(id);
  };

  if (user.responseType === "delete-success") {
    clearUser();
    logout();
  }

  if (isAuth) {
    Redirect("/auth/login");
  }

  return (
    <Fragment>
      <div className="card  my-4">
        <div className="card-header">
          <h2 className="text-primary">
            <i className="fas fa-id-card"></i> Perfil
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
          <Link
            to={`/user/edit/${userAuth._id}`}
            className="btn btn-primary mb-1 mr-1"
          >
            <i className="fas fa-user"></i> Editar Perfil
          </Link>
          <button
            onClick={handleDeleteUser}
            type="button"
            className="btn btn-danger mb-1 mr-1"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              <i className="fas fa-user-minus"></i>
            )}{" "}
            Eliminar Cuenta
          </button>
          <ConfirmModal
            show={showConfirm}
            msg={`¿Deseas eliminar tu cuenta?`}
            alertType="warning"
            onClose={handleClose}
            onConfirm={() => handleConfirm(userAuth.id)}
          />
        </div>
      </div>
    </Fragment>
  );
};

const mapSateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

const actionCreator = {
  deleteUser: userActions.deleteUser,
  clearUser: userActions.clearUser,
  logout: authActions.logout,
};

export default connect(mapSateToProps, actionCreator)(UserPage);
