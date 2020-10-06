import React from "react";
import { Link } from "react-router-dom";

const DashboardAdminItem = ({ title, actionPath, indicator, icon }) => {
  return (
    <div className="col-sm-4">
      <div className="card my-2">
        <div className="card-header text-secondary">
          <i className={icon}></i> {title}
        </div>
        <div className="card-body">
          <div className="display-3 text-center text-secondary">{indicator}</div>
        </div>
        <div className="card-footer">
          <Link className="btn btn-primary" to={actionPath}>
            Gestionar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdminItem;
