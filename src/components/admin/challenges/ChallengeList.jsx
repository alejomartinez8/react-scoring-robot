import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { challengeActions } from "../../../redux/actions";
import Spinner from "../../layout/Spinner";

const ChallengesList = ({
  challenge: { challenges, loading },
  getAllChallenges,
  deleteChallenge,
  match,
}) => {
  const { path } = match;

  useEffect(() => {
    getAllChallenges();
  }, [getAllChallenges]);

  const handleDeleteChallenge = (id) => {
    deleteChallenge(id);
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/admin/" className="btn btn-sm btn-primary mb-2">
            Atrás
          </Link>
          <div className="card shadow mb-4">
            <div className="card-header">
              <h2 className="text-primary">Administrar Retos</h2>
            </div>

            <div className="card-body ">
              <p>
                Administra tus retos (sólo Administradores pueden acceder a esta
                sección)
              </p>
              <Link className="btn btn-sm btn-success mb-2" to={`${path}/add`}>
                Agregar Reto
              </Link>
              <div className="table-responsive">
                <table className="table table-striped ">
                  <thead>
                    <tr>
                      <th>Nombre Reto</th>
                      <th>Version</th>
                      <th>Habilitado</th>
                      <th>Descripción</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {challenges &&
                      challenges.map((challenge) => (
                        <tr key={challenge.id}>
                          <td>{challenge.name}</td>
                          <td>{challenge.version}</td>
                          <td>{challenge.available ? "Sí" : "No"}</td>
                          <td>{challenge.description}</td>
                          <td style={{ whiteSpace: "nowrap" }}>
                            <Link
                              to={`${path}/edit/${challenge.id}`}
                              className="btn btn-sm btn-primary mr-1"
                            >
                              Editar
                            </Link>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDeleteChallenge(challenge.id)}
                            >
                              <span>Eliminar</span>
                            </button>
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
  getAllChallenges: challengeActions.getAllChallenges,
  deleteChallenge: challengeActions.deleteChallenge,
};

export default connect(mapStateToProps, actionCreators)(ChallengesList);
