import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Profile = ({ user, match }) => {
  const { path } = match;
  return (
    <div className="container">
      <div className="card shadow mb-4"></div>
      <h1 className="text-primary my-2">Perfil</h1>
      <p>
        <strong>Nombre: </strong> {user.firstName} {user.lastName}
        <br />
        <strong>Email: </strong> {user.email}
        <br />
        <strong>Role: </strong> {user.role}
      </p>
      <Link className="btn btn-primary" to={`${path}/update`}>
        Actualizar
      </Link>
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Profile);
