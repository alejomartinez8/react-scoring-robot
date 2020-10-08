import React from "react";
import { Modal, Button } from "react-bootstrap";
import ChallengeScoreForm from "../ChallengeScoreForm";

const ModalEditScoringTurn = ({ showEdit, setShowEdit }) => {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showEdit}
      onHide={() => setShowEdit(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modificar Turno</Modal.Title>
      </Modal.Header>
      <Modal.Body>{/* <ChallengeScoreForm /> */}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowEdit(false)}>
          Cerrar
        </Button>
        <Button variant="primary">Actualizar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditScoringTurn;
