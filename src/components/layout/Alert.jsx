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
        size="md"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header
          closeButton
          className={`bg-${alert.alertType} text-center display-3 text-white`}
        >
          <i
            className={`fas ${
              alert.alertType === "success"
                ? "fa-check-circle"
                : "fa-exclamation-circle"
            }`}
          ></i>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div>{alert.msg}</div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className={`btn btn-${alert.alertType}`}
            onClick={() => handleClose(alert.id)}
          >
            OK
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
