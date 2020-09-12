import React, { Fragment } from "react";
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
      <div className="card shadow">
        <div className="card-header">
          <h1 className="large text-primary">Panel Administración</h1>
        </div>

        <div className="card-body">
          <table className="table table-striped">
            <thead></thead>
            <tbody>
              <DashboardAdminItem
                title="Eventos"
                description="Crea y actualiza eventos manualmente"
                actionPath={`${path}/events`}
                actionDescription="Administrar"
              />

              <DashboardAdminItem
                title="Retos"
                description="Crea y actualiza retos manualmente"
                actionPath={`${path}/challenges`}
                actionDescription="Administrar"
              />

              <DashboardAdminItem
                title="Usuarios"
                description="Crea y actualiza usuarios manualmente"
                actionPath={`${path}/users`}
                actionDescription="Administrar"
              />

              <DashboardAdminItem
                title="Equipos"
                description="Crea y actualiza equipos manualmente"
                actionPath={`${path}/teams`}
                actionDescription="Administrar"
              />
            </tbody>
          </table>
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
