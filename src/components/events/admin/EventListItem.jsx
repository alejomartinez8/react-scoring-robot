import React, { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmModal from "../../layout/ConfirmModal";
import ToggleButton from "../../layout/ToggleButton";

const EventListItem = ({ event, actionConfirm, handleToggleActiveEvent }) => {
  const [showConfirm, SetShowConfirm] = useState(false);

  const getStage = (stage) => {
    switch (stage) {
      case "registration":
        return "Registro Equipos";
      case "scoring":
        return "Calificando";
      case "finished":
        return "Finalizado";
      default:
        return "";
    }
  };

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
    <tr key={event._id}>
      <td>{event.name}</td>
      <td>{event.slug}</td>
      <td>{event.year}</td>
      <td>{getStage(event.stage)}</td>
      <td>
        {/* <input
          type="checkbox"
          checked={event.active}
          onChange={() => {
            handleToggleActiveEvent(event._id);
          }}
        /> */}
        <ToggleButton
          toggle={event.active}
          toggleId={event._id}
          handleToggle={handleToggleActiveEvent}
        />
      </td>
      <td style={{ whiteSpace: "nowrap" }}>
        <Link
          to={`events/edit/${event._id}`}
          className="btn btn-sm btn-primary mr-1"
        >
          Editar
        </Link>
        <button className="btn btn-sm btn-danger" onClick={handleDeleteButton}>
          Eliminar
        </button>
        <ConfirmModal
          show={showConfirm}
          msg={`¿Deseas borrar el evento: ${event.name}?`}
          alertType="warning"
          onClose={handleClose}
          onConfirm={() => handleConfirm(event._id)}
        />
      </td>
    </tr>
  );
};

export default EventListItem;
