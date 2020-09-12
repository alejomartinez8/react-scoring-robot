import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../layout/Spinner";
import DashboardAdminItem from "./DashboardAdminItem";

const DashboardAdmin = ({ auth: { userAuth, loading }, match }) => {
  const { path } = match;
  return loading && userAuth === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard Admin</h1>
      <p>Panel de Administración</p>

      <div className="row">
        <div className="col-sm-6 my-3">
          <DashboardAdminItem
            title="Eventos"
            description="Crea y actualiza eventos manualmente"
            actionPath={`${path}/events`}
            actionDescription="Administrar Events"
          />
        </div>

        <div className="col-sm-6 my-3">
          <DashboardAdminItem
            title="Retos"
            description="Crea y actualiza retos manualmente"
            actionPath={`${path}/challenges`}
            actionDescription="Administrar Retos"
          />
        </div>

        <div className="col-sm-6 my-3">
          <DashboardAdminItem
            title="Usuarios"
            description="Crea y actualiza usuarios manualmente"
            actionPath={`${path}/users`}
            actionDescription="Administrar Usuarios"
          />
        </div>

        <div className="col-sm-6 my-3">
          <DashboardAdminItem
            title="Equipos"
            description="Crea y actualiza equipos manualmente"
            actionPath={`${path}/teams`}
            actionDescription="Administrar Equipos"
          />
        </div>
      </div>
    </Fragment>
  );
};

DashboardAdmin.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapSateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapSateToProps)(DashboardAdmin);
