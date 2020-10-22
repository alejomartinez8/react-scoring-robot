import React, { useState } from "react";
import ToggleButton from "../../layout/ToggleButton";
import ConfirmModal from "../../layout/ConfirmModal";
import { Link } from "react-router-dom";

const TeamListItem = ({ team, actionConfirm, handleRegisterTeam }) => {
  const [showConfirm, SetShowConfirm] = useState(false);

  const handleDeleteTeam = (e) => {
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
    <tr key={team._id}>
      <td>{"name" in team ? team.name : ""}</td>
      <td>{"event" in team && team.event.name}</td>
      <td>{"category" in team ? team.category : ""}</td>
      <td>{"challenge" in team ? team.challenge.name : ""}</td>
      {/* <td>{team.user !== null ? team.user.fullName : ""}</td> */}

      <td className="text-center">
        <ToggleButton
          toggle={team.registered}
          toggleId={team._id}
          handleToggle={handleRegisterTeam}
        />
      </td>
      <td style={{ whiteSpace: "nowrap" }}>
        <Link to={`teams/edit/${team._id}`} className="btn btn-sm btn-primary m-1">
          <i className="fas fa-edit"></i> Editar
        </Link>

        <button className="btn btn-sm btn-danger m-1" onClick={handleDeleteTeam}>
          Eliminar
        </button>
        <ConfirmModal
          show={showConfirm}
          msg={`¿Deseas borrar el equipo ${team.name}?`}
          alertType="warning"
          onClose={handleClose}
          onConfirm={() => handleConfirm(team._id)}
        />
      </td>
    </tr>
  );
};

export default TeamListItem;
