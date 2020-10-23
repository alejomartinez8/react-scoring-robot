import React, { useState } from "react";
import ConfirmModal from "../../layout/ConfirmModal";

const ChallengeResultTurnItem = ({
  team,
  turn,
  index,
  userAuth,
  handleShowEdit,
  actionConfirm,
}) => {
  const [showConfirm, SetShowConfirm] = useState(false);

  const handleDeleteScore = (e) => {
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
    <div key={turn._id} className="d-flex justify-content-center">
      <span>
        <strong>Turno {index + 1}:</strong> {turn.totalPoints} pts{" "}
        <strong>Juez: </strong>
        {"judgeName" in turn ? turn.judgeName : ""}{" "}
        {userAuth.role === "Admin" && (
          <span>
            <button
              className="btn btn-sm btn-primary m-1"
              onClick={() => handleShowEdit(turn._id)}
            >
              Editar
            </button>{" "}
            <button
              className="btn btn-sm btn-danger m-1"
              onClick={handleDeleteScore}
            >
              Eliminar
            </button>
            <ConfirmModal
              show={showConfirm}
              msg={`¿Deseas borrar el turno ${index + 1} del equipo ${team.name}?`}
              alertType="warning"
              onClose={handleClose}
              onConfirm={() => handleConfirm(turn._id)}
            />
          </span>
        )}
      </span>
    </div>
  );
};

export default ChallengeResultTurnItem;
