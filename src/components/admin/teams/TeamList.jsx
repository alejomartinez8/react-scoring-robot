import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { teamActions } from "../../../redux/actions";
import { Spinner } from "react-bootstrap";
import ToggleButton from "../../layout/ToggleButton";

const TeamsList = ({
  team: { teams, loading },
  getTeams,
  registerTeam,
  deleteTeam,
  match,
}) => {
  const { path } = match;

  useEffect(() => {
    getTeams();
  }, [getTeams]);

  const handleDeleteTeam = (_id) => {
    deleteTeam(_id);
  };

  const handleRegisterTeam = (id) => {
    registerTeam(id);
    getTeams();
  };

  return (
    <Fragment>
      {loading === 0 ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Fragment>
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
                      <th>Registrado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams.length > 0 &&
                      teams.map((team) => (
                        <tr key={team._id}>
                          <td>{"name" in team ? team.name : ""}</td>
                          <td>{"category" in team ? team.category : ""}</td>
                          <td>{"challenge" in team ? team.challenge.name : ""}</td>
                          <td>
                            {"user" in team && "fullName" in team.user
                              ? team.user.fullName
                              : ""}
                          </td>

                          <td className="text-center">
                            <ToggleButton
                              toggle={team.registered}
                              toggleId={team._id}
                              handleToggle={handleRegisterTeam}
                            />
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
