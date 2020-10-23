import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { eventActions, teamActions } from "../../../redux/actions";
import { Spinner } from "react-bootstrap";
import TeamListItem from "./TeamListItem";

const TeamsList = ({
  events,
  team: { teams, loading },
  getTeams,
  registerTeam,
  deleteTeam,
  getEvents,
  match,
}) => {
  const { path } = match;
  const [query, setQuery] = useState({ event: "", challenge: "" });
  const [challengeOptions, setChallengeOptions] = useState([]);
  const { event, challenge } = query;

  useEffect(() => {
    getEvents();
  }, [getTeams, getEvents]);

  useEffect(() => {
    getTeams(getQueryTeam());
    // eslint-disable-next-line
  }, [query, getTeams]);

  const handleRegisterTeam = (id) => {
    const teamQuery = getQueryTeam();
    registerTeam(id, teamQuery);
  };

  function getQueryTeam() {
    const _query = {};
    if (query.event !== "") {
      _query.event = query.event;
    }
    if (query.challenge !== "") {
      _query.challenge = query.challenge;
    }

    return _query;
  }

  const handleInputChange = (e) => {
    switch (e.target.name) {
      case "event":
        setQuery({ ...query, event: e.target.value });

        if (e.target.value) {
          const challengeOptions = events
            .filter((event) => event._id === e.target.value)
            .map((elm) => elm.challenges)[0];
          setChallengeOptions(challengeOptions);
        } else {
          setChallengeOptions([]);
        }
        break;

      case "challenge":
        setQuery({ ...query, challenge: e.target.value });
        break;

      default:
        break;
    }
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
              <form className="form-inline mb-3">
                <Link className="btn btn-primary mr-2" to={`${path}/add`}>
                  Agregar Equipos
                </Link>
                <div className="form-group">
                  <label className="mx-1">Evento: </label>
                  <select
                    name="event"
                    id="event"
                    disabled={events.length === 0}
                    className="form-control"
                    value={event}
                    onChange={handleInputChange}
                  >
                    <option></option>
                    {events.map((elm) => (
                      <option key={elm._id} value={elm._id}>
                        {elm.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mx-sm-3">
                  <label className="mx-1">Reto: </label>
                  <select
                    name="challenge"
                    id="challenge"
                    disabled={events.length === 0}
                    className="form-control"
                    value={challenge}
                    onChange={handleInputChange}
                  >
                    <option></option>
                    {challengeOptions.map((elm) => (
                      <option key={elm._id} value={elm._id}>
                        {elm.name}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
              <div className="table-responsive">
                <table className="table table-striped ">
                  <thead className="thead-dark">
                    <tr>
                      <th>Nombre Equipo</th>
                      <th>Evento</th>
                      <th>Categoría</th>
                      <th>Reto</th>
                      {/* <th>Entrenador</th> */}
                      <th>Registrado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams.length > 0 &&
                      teams.map((team) => (
                        <TeamListItem
                          key={team._id}
                          team={team}
                          actionConfirm={deleteTeam}
                          handleRegisterTeam={handleRegisterTeam}
                        />
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
  events: state.event.events,
});

const actionCreators = {
  getTeams: teamActions.getTeams,
  registerTeam: teamActions.registerTeam,
  deleteTeam: teamActions.deleteTeam,
  getEvents: eventActions.getEvents,
};

export default connect(mapStateToProps, actionCreators)(TeamsList);
