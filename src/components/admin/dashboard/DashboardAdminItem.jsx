import React from "react";
import { Link } from "react-router-dom";

const DashboardAdminItem = ({
  title,
  description,
  actionPath,
  actionDescription,
}) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{description}</td>
      <td>
        <Link className="btn btn-primary" to={actionPath}>
          {actionDescription}
        </Link>
      </td>
    </tr>
  );
};

export default DashboardAdminItem;
