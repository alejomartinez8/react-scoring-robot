import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { challengeActions } from "../../../redux/actions";
import { Spinner } from "react-bootstrap";
import ConfirmModal from "../../layout/ConfirmModal";

const ChallengesList = ({
  challenge: { challenges, loading },
  getChallenges,
  deleteChallenge,
  match,
}) => {
  const { path } = match;
  const [showConfirm, SetShowConfirm] = useState(false);

  useEffect(() => {
    getChallenges();
  }, [getChallenges]);

  const handleDeleteChallenge = (e) => {
    e.preventDefault();
    SetShowConfirm(true);
  };

  const handleClose = () => {
    SetShowConfirm(false);
  };

  const handleConfirm = (id) => {
    SetShowConfirm(false);
    deleteChallenge(id);
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Fragment>
          <div className="card  mb-4">
            <div className="card-header">
              <h2 className="text-primary">Administrar Retos</h2>
            </div>

            <div className="card-body ">
              <Link className="btn btn-sm btn-primary mb-2" to={`${path}/add`}>
                Agregar Reto
              </Link>
              <div className="table-responsive">
                <table className="table table-striped ">
                  <thead className="thead-dark">
                    <tr>
                      <th>Nombre Reto</th>
                      <th>Slug</th>
                      <th>Habilitado</th>
                      <th>Categorías Habilitadas</th>
                      <th>Editar/Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {challenges &&
                      challenges.map((challenge) => (
                        <tr key={challenge._id}>
                          <td>{challenge.name}</td>
                          <td>{challenge.slug}</td>
                          <td>
                            {challenge.available ? (
                              <span className="badge badge-pill badge-success">
                                Sí
                              </span>
                            ) : (
                              <span className="badge badge-pill badge-danger">
                                No
                              </span>
                            )}
                          </td>
                          <td>
                            {challenge.categories.map((category, index) => (
                              <span
                                key={index}
                                className="badge badge-pill badge-info mx-1"
                              >
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
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={handleDeleteChallenge}
                            >
                              Eliminar
                            </button>
                            <ConfirmModal
                              show={showConfirm}
                              msg="¿Deseas borrar este reto?"
                              alertType="warning"
                              onClose={handleClose}
                              onConfirm={() => handleConfirm(challenge._id)}
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  challenge: state.challenge,
});

const actionCreators = {
  getChallenges: challengeActions.getChallenges,
  deleteChallenge: challengeActions.deleteChallenge,
};

export default connect(mapStateToProps, actionCreators)(ChallengesList);
