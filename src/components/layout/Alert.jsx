import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { alertActions } from "../../redux/actions";
import { Modal } from "react-bootstrap";

const Alert = ({ alerts, deleteAlert }) => {
  useEffect(() => {
    if (alerts.length > 0) {
      handleShow();
    }
  }, [alerts]);

  const [show, setShow] = useState(false);

  const handleClose = (id) => {
    setShow(false);
    deleteAlert(id);
  };

  const handleShow = () => setShow(true);

  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <Modal
        key={alert.id}
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Scoring-Robot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.msg}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={() => handleClose(alert.id)}>
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>
    ))
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

const actionsCreators = {
  deleteAlert: alertActions.deleteAlert,
};

export default connect(mapStateToProps, actionsCreators)(Alert);
