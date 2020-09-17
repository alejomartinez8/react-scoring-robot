import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { teamActions } from "../../redux/actions";
import Spinner from "../layout/Spinner";
import TeamPlayerForm from "./TeamPlayerForm";

const initialState = {
  coach: "",
  name: "",
  category: "",
  institution: "",
  players: [],
};

const TeamForm = ({ auth, teams, addTeam, updateTeam }) => {
  const teamUpdate = Object.keys(teams.team).length !== 0;

  useEffect(() => {
    if (!teams.loading && teamUpdate) {
      const teamData = { ...initialState };
      for (const key in teams.team) {
        if (key in teamData) {
          teamData[key] = teams.team[key];
        }
      }
      setTeamData(teamData);
    }
  }, [teams.loading, teams.team, teamUpdate]);

  const [teamData, setTeamData] = useState(initialState);
  const { coach, name, category, institution, players } = teamData;

  console.log(players);

  const handleChange = (e) => {
    setTeamData({ ...teamData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teamUpdate) {
      updateTeam(teams.team._id, teamData);
    } else {
      addTeam(teamData);
      setTeamData(initialState);
    }
  };

  return (
    <Fragment>
      {teams.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/admin/teams" className="btn btn-sm btn-primary mb-2">
            Atrás
          </Link>
          <div className="card shadow mb-2">
            <div className="card-header">
              <h2 className="text-primary">
                {!teamUpdate ? "Agregar Equipo" : "Editar Equipo"}
              </h2>
            </div>

            <div className="card-body">
              <form className="form" onSubmit={handleSubmit}>
                {auth.userAuth.role === "Admin" && (
                  <div className="form-group row">
                    <label className="col-md-4 col-form-group" htmlFor="coach">
                      Entrenador
                    </label>
                    <div className="col-md">
                      <select
                        className="form-control"
                        id="coach"
                        name="coach"
                        value={coach}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="form-group row">
                  <label className="col-md-4 col-form-group" htmlFor="name">
                    Nombre Equipo
                  </label>
                  <div className="col-md">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-md-4 col-form-group" htmlFor="institution">
                    Institución Educativa
                  </label>
                  <div className="col-md">
                    <input
                      type="text"
                      className="form-control"
                      id="institution"
                      name="institution"
                      value={institution}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-md-4 col-form-group" htmlFor="category">
                    Categoría
                  </label>
                  <div className="col-md">
                    <select
                      type="text"
                      className="form-control"
                      id="category"
                      name="category"
                      value={category}
                      onChange={handleChange}
                    >
                      <option value="elementary">Infantil</option>
                      <option value="middle">Junior</option>
                      <option value="high">Juvenil</option>
                      <option value="senior">Senior</option>
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-md-4 col-form-group" htmlFor="event">
                    Evento
                  </label>
                  <div className="col-md">
                    <select
                      name="event"
                      id="event"
                      className="form-control"
                    ></select>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-md-4 col-form-group" htmlFor="challenge">
                    Reto
                  </label>
                  <div className="col-md">
                    <select
                      name="challenge"
                      id="challenge"
                      className="form-control"
                    ></select>
                  </div>
                </div>

                <hr />
                <h5>Integrante Equipo #1</h5>
                <TeamPlayerForm player={players[0]} />

                <hr />
                <h5>Integrante Equipo #2</h5>
                <TeamPlayerForm player={players[1]} />

                <hr />
                <h5>Integrante Equipo #3</h5>
                <TeamPlayerForm player={players[2]} />

                <hr />
                <h5>Integrante Equipo #4</h5>
                <TeamPlayerForm player={players[3]} />

                <hr />

                <div className="form-row">
                  <button
                    type="submit"
                    className="btn btn-primary m-1"
                    disabled={teams.loading}
                  >
                    {teams.loading && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    Guardar
                  </button>
                  <Link to="/admin/teams" className="btn btn-secondary m-1">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user.users,
  challenges: state.challenge.challenges,
  teams: state.team,
});

const actionCreators = {
  addTeam: teamActions.addTeam,
  updateTeam: teamActions.updateTeam,
};

export default connect(mapStateToProps, actionCreators)(TeamForm);
