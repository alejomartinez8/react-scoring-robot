import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";

const Alert = ({ alerts }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (alerts.length > 0) {
      handleShow();
    }
  }, [alerts]);

  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      // <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      //   {alert.msg}
      // </div>
      <Modal
        key={alert.id}
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        {/* <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header> */}
        <Modal.Body>{alert.msg}</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-success" onClick={handleClose}>
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

export default connect(mapStateToProps)(Alert);
