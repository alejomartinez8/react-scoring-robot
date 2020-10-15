import React from "react";
import { Modal } from "react-bootstrap";

const ConfirmModal = ({ show = false, msg, alertType, onClose, onConfirm }) => {
  return (
    <Modal show={show} onHide={onClose} size="md">
      <Modal.Header
        closeButton
        className={`bg-${alertType} text-center display-3 text-white`}
      >
        <i
          className={`fas ${
            alertType === "success" ? "fa-check-circle" : "fa-exclamation-circle"
          }`}
        ></i>
      </Modal.Header>
      <Modal.Body className="text-center">
        <div>{msg}</div>
      </Modal.Body>
      <Modal.Footer>
        <button className={`btn btn-danger`} onClick={onClose}>
          No
        </button>
        <button className="btn btn-success" onClick={onConfirm}>
          Sí
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
