import React, { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmModal from "../../layout/ConfirmModal";

const ChallengeListItem = ({ challenge, actionConfirm, path }) => {
  const [showConfirm, SetShowConfirm] = useState(false);

  const handleDeleteButton = (e) => {
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
    <tr key={challenge._id}>
      <td>{challenge.name}</td>
      <td>{challenge.slug}</td>
      <td>
        {challenge.available ? (
          <span className="badge badge-pill badge-success">Sí</span>
        ) : (
          <span className="badge badge-pill badge-danger">No</span>
        )}
      </td>
      <td>
        {challenge.categories.map((category, index) => (
          <span key={index} className="badge badge-pill badge-info mx-1">
            {category}
          </span>
        ))}
      </td>
      <td style={{ whiteSpace: "nowrap" }}>
        <Link
          to={`${path}/edit/${challenge._id}`}
          className="btn btn-sm btn-primary mr-1"
        >
          Editar
        </Link>
        <button className="btn btn-sm btn-danger" onClick={handleDeleteButton}>
          Eliminar
        </button>
        <ConfirmModal
          show={showConfirm}
          msg={`¿Deseas borrar el reto ${challenge.name}?`}
          alertType="warning"
          onClose={handleClose}
          onConfirm={() => handleConfirm(challenge._id)}
        />
      </td>
    </tr>
  );
};

export default ChallengeListItem;
