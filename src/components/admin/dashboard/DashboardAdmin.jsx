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
      <div className="card shadow mb-4 border-left-primary">
        <div className="card-header">
          <h2 className="text-primary">
            <i className="fas fa-tachometer"></i> Dashboard
          </h2>
        </div>

        <div className="card-body table-responsive">
          <table className="table">
            <thead></thead>
            <tbody>
              <DashboardAdminItem
                title="Eventos"
                description="Crea y actualiza eventos manualmente"
                actionPath={`${path}/events`}
                actionDescription="Administrar"
                icon="fas fa-calendar"
              />

              <DashboardAdminItem
                title="Retos"
                description="Crea y actualiza retos manualmente"
                actionPath={`${path}/challenges`}
                actionDescription="Administrar"
                icon="fas fa-trophy"
              />

              <DashboardAdminItem
                title="Usuarios"
                description="Crea y actualiza usuarios manualmente"
                actionPath={`${path}/users`}
                actionDescription="Administrar"
                icon="fas fa-user"
              />

              <DashboardAdminItem
                title="Equipos"
                description="Crea y actualiza equipos manualmente"
                actionPath={`${path}/teams`}
                actionDescription="Administrar"
                icon="fas fa-users"
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
