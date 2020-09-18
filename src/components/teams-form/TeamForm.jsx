import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { teamActions, eventActions, challengeActions } from "../../redux/actions";
import Spinner from "../layout/Spinner";
import TeamFormPlayer from "./TeamFormPlayer";
import TeamFormCategory from "./TeamFormCategory";
import TeamFormInfo from "./TeamFormInfo";
import TeamFormEvent from "./TeamFormEvent";
import TeamFormChallenge from "./TeamFormChallenge";

const initialState = {
  coach: "",
  name: "",
  institution: "",
  event: "",
  category: "",
  challenge: "",
  players: [],
};

const TeamForm = ({
  auth,
  team,
  addTeam,
  updateTeam,
  events,
  getAllEvents,
  challenges,
  getAllChallenges,
}) => {
  const [teamData, setTeamData] = useState(initialState);
  const { coach, name, institution, event, category, challenge, players } = teamData;

  //
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [challengeOptions, setChallengeOptions] = useState([]);

  // load form
  const teamUpdate = Object.keys(team.team).length !== 0;
  useEffect(() => {
    if (!team.loading && teamUpdate) {
      const teamData = { ...initialState };
      for (const key in team.team) {
        if (key in teamData) {
          teamData[key] = team.team[key];
        }
      }
      setTeamData(teamData);
    }
  }, [team.loading, team.team, teamUpdate]);

  // load events for select
  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  // load challenges options for select
  useEffect(() => {
    getAllChallenges();
  }, [getAllChallenges]);

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setTeamData({ ...teamData, [e.target.name]: e.target.value });

    // event change -> choose category
    if (e.target.name === "event") {
      setCategoryOptions(
        events
          .filter((elm) => elm._id === e.target.value)
          .map((elm) => elm.categories)[0]
      );
    }

    //category change -> choose challenge
    if (e.target.name === "category") {
      setChallengeOptions(
        challenges
          .filter((challenge) => challenge.categories.includes(e.target.value))
          .map((elm) => ({ _id: elm._id, name: elm.name }))
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teamUpdate) {
      updateTeam(team.team._id, teamData);
    } else {
      addTeam(teamData);
      setTeamData(initialState);
    }
  };

  return (
    <Fragment>
      {team.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/admin/team" className="btn btn-sm btn-primary mb-2">
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

                <TeamFormInfo
                  name={name}
                  institution={institution}
                  handleChange={handleChange}
                />

                <TeamFormEvent
                  options={events}
                  event={event}
                  handleChange={handleChange}
                />

                <TeamFormCategory
                  options={categoryOptions}
                  category={category}
                  handleChange={handleChange}
                  disabled={!event}
                />

                <TeamFormChallenge
                  options={challengeOptions}
                  challenge={challenge}
                  handleChange={handleChange}
                  disabled={!category}
                />

                <hr />
                <h5>Integrante Equipo #1</h5>
                <TeamFormPlayer player={players[0]} />

                <hr />
                <h5>Integrante Equipo #2</h5>
                <TeamFormPlayer player={players[1]} />

                <hr />
                <h5>Integrante Equipo #3</h5>
                <TeamFormPlayer player={players[2]} />

                <hr />
                <h5>Integrante Equipo #4</h5>
                <TeamFormPlayer player={players[3]} />

                <hr />

                <div className="form-row">
                  <button
                    type="submit"
                    className="btn btn-primary m-1"
                    disabled={team.loading}
                  >
                    {team.loading && (
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
  team: state.team,
  events: state.event.events,
  challenges: state.challenge.challenges,
});

const actionCreators = {
  addTeam: teamActions.addTeam,
  updateTeam: teamActions.updateTeam,
  getAllEvents: eventActions.getAllEvents,
  getAllChallenges: challengeActions.getAllChallenges,
};

export default connect(mapStateToProps, actionCreators)(TeamForm);
