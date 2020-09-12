import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { teamActions } from "../../../redux/actions";

const TeamsList = ({ team: { teams }, getAllTeams, deleteTeam, match }) => {
  const { path } = match;

  useEffect(() => {
    getAllTeams();
  }, [getAllTeams]);

  const handleDeleteTeam = (id) => {
    deleteTeam(id);
  };

  return (
    <Fragment>
      <Link to="/admin/teams" className="btn btn-sm btn-primary mb-2">
        Atrás
      </Link>
      <div className="card shadow mb-4">
        <div className="card-header">
          <h1>Administrar Equipos</h1>
        </div>

        <div className="card-body">
          <p>
            Administra equipos (sólo Administradores pueden acceder a esta sección)
          </p>
          <Link className="btn btn-sm btn-success mb-2" to={`${path}/add`}>
            Agregar Equipos
          </Link>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nombre Equipos</th>
                <th>Categoría</th>
                <th>Entrenador</th>
                <th>Institución</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {teams &&
                teams.map((team) => (
                  <tr key={team.id}>
                    <td>{team.name}</td>
                    <td>{team.category}</td>
                    <td>{team.coach}</td>
                    <td>{team.institution}</td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      <Link
                        to={`${path}/edit/${team.id}`}
                        className="btn btn-sm btn-primary mr-1"
                      >
                        Editar
                      </Link>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteTeam(team.id)}
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
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  team: state.team,
});

const actionCreators = {
  getAllTeams: teamActions.getAllTeams,
  deleteTeam: teamActions.deleteTeam,
};

export default connect(mapStateToProps, actionCreators)(TeamsList);
