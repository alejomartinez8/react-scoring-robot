import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../redux/actions/profile.actions";
import { Spinner } from "../../components/layout/Spinner";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p>
        <i className="fas fa-use"></i>Bienvenido {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment></Fragment>
      ) : (
        <Fragment>
          <p>Todavía no tienes perfil, agrega tu información</p>
          <Link to="/create-profile" className="btn btn-primary m-1">
            Crear Perfil
          </Link>
          <button className="btn btn-daner">
            <i className="fas fa-user-minus"></i>Eliminar Cuenta
          </button>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapSateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapSateToProps, { getCurrentProfile })(Dashboard);
