import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../components/layout/Spinner";
import { deleteUser } from "../../redux/actions/user.actions";

const ProfileDetail = ({ auth: { userAuth, loading }, deleteUser, match }) => {
  const { path } = match;

  const onDelete = () => {
    console.log("Delete User");
    deleteUser(userAuth.id);
  };

  return loading && userAuth === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="card shadow">
        <div className="card-header">
          <h2 className="text-primary">Mi Perfil</h2>
        </div>

        <div className="card-body">
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

        <div className="card-footer">
          <Link to={`${path}/edit-profile`} className="btn btn-primary">
            <i className="fas fa-user"></i> Editar Perfil
          </Link>
          <button
            onClick={onDelete}
            type="button"
            className="btn btn-danger m-1"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm m-1"></span>
            ) : (
              <i className="fas fa-user-minus"></i>
            )}
            Eliminar Cuenta
          </button>
        </div>
      </div>
    </Fragment>
  );
};

ProfileDetail.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired,
};

const mapSateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapSateToProps, { deleteUser })(ProfileDetail);
