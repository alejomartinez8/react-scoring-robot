import React from "react";
import { Link } from "react-router-dom";

const DashboardAdminItem = ({
  title,
  description,
  actionPath,
  actionDescription,
}) => {
  return (
    <div className="card shadow h-100">
      <div className="card-header">
        <h2>{title}</h2>
      </div>

      <div className="card-body">
        <p>{description}</p>
      </div>
      <div className="card-footer">
        <Link className="btn btn-primary" to={actionPath}>
          {actionDescription}
        </Link>
      </div>
    </div>
  );
};

export default DashboardAdminItem;
