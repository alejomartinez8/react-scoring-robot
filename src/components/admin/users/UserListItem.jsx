import React, { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmModal from "../../layout/ConfirmModal";

const UserListItem = ({ user, actionConfirm }) => {
  const [showConfirm, SetShowConfirm] = useState(false);

  const handleDeleteUser = (e) => {
    e.preventDefault();
    SetShowConfirm(true);
  };

  const handleClose = () => {
    SetShowConfirm(false);
  };

  const handleConfirm = (id) => {
    SetShowConfirm(false);
    actionConfirm(id);
  };

  return (
    <tr key={user._id}>
      <td>
        {user.firstName} {user.lastName}
      </td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td style={{ whiteSpace: "nowrap" }}>
        <Link to={`users/edit/${user._id}`} className="btn btn-sm btn-primary mr-1">
          Editar
        </Link>
        <button onClick={handleDeleteUser} className="btn btn-sm btn-danger">
          Eliminar
        </button>
        <ConfirmModal
          show={showConfirm}
          msg={`¿Deseas borrar el evento: ${user.firstName} ${user.lastName}?`}
          alertType="warning"
          onClose={handleClose}
          onConfirm={() => handleConfirm(user._id)}
        />
      </td>
    </tr>
  );
};

export default UserListItem;
