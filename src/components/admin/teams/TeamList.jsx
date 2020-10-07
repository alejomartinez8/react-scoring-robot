import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { teamActions } from "../../../redux/actions";
import Spinner from "../../layout/Spinner";
import ButtonBack from "../../layout/ButtonBack";

const TeamsList = ({
  team: { teams },
  getTeams,
  registerTeam,
  deleteTeam,
  match,
}) => {
  const { path } = match;

  useEffect(() => {
    getTeams();
  }, [getTeams, teams]);

  const handleDeleteTeam = (_id) => {
    deleteTeam(_id);
  };

  const handleRegisterTeam = (id) => {
    registerTeam(id);
    getTeams();
  };

  return (
    <Fragment>
      {teams.length === 0 ? (
        <Spinner />
      ) : (
        <Fragment>
          <ButtonBack className="btn btn-primary mr-1 my-2">Atrás</ButtonBack>
          <div className="card  mb-4">
            <div className="card-header">
              <h2 className="text-primary">Administrar Equipos</h2>
            </div>

            <div className="card-body">
              <Link className="btn btn-sm btn-primary mb-2" to={`${path}/add`}>
                Agregar Equipos
              </Link>
              <div className="table-responsive">
                <table className="table table-striped ">
                  <thead className="thead-dark">
                    <tr>
                      <th>Nombre Equipos</th>
                      <th>Categoría</th>
                      <th>Reto</th>
                      <th>Entrenador</th>
                      <th>Institución</th>
                      <th>Ciudad</th>
                      <th>País</th>
                      <th>Registrado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams.length > 0 &&
                      teams.map((team) => (
                        <tr key={team._id}>
                          <td>{team.name ? team.name : ""}</td>
                          <td>{team.category ? team.category : ""}</td>
                          <td>
                            {team.challenge !== undefined ? team.challenge.name : ""}
                          </td>
                          <td>{team.user ? team.user.fullName : ""}</td>
                          <td>{team.institution}</td>
                          <td>{team.user ? team.user.city : ""}</td>
                          <td>{team.user ? team.user.country : ""}</td>
                          <td className="text-center">
                            <label class="switch">
                              <input
                                type="checkbox"
                                checked={team.registered}
                                onChange={() => handleRegisterTeam(team._id)}
                              />
                              <span class="slider round"></span>
                            </label>
                          </td>
                          <td style={{ whiteSpace: "nowrap" }}>
                            <Link
                              to={`${path}/edit/${team._id}`}
                              className="btn btn-sm btn-primary m-1"
                            >
                              <i className="fas fa-edit"></i> Editar
                            </Link>

                            <button
                              className="btn btn-sm btn-danger m-1"
                              onClick={() => handleDeleteTeam(team._id)}
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
  team: state.team,
});

const actionCreators = {
  getTeams: teamActions.getTeams,
  registerTeam: teamActions.registerTeam,
  deleteTeam: teamActions.deleteTeam,
};

export default connect(mapStateToProps, actionCreators)(TeamsList);
