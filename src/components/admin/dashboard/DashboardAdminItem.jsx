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
      <td>
        <strong>{title}</strong>
        <p>{description}</p>
      </td>
      <td>
        <Link className="btn btn-primary" to={actionPath}>
          {actionDescription}
        </Link>
      </td>
    </tr>
  );
};

export default DashboardAdminItem;
