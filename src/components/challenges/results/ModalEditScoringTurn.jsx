import React from "react";
import { Modal, Button } from "react-bootstrap";
import ChallengeScoreForm from "../score/ChallengeScoreForm";

const ModalEditScoringTurn = ({
  showEdit,
  setShowEdit,
  turn,
  handleUpdateScore,
}) => {
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
      <Modal.Body>
        <ChallengeScoreForm turn={turn} handleUpdateScore={handleUpdateScore} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowEdit(false)}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditScoringTurn;
