import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { teamActions, eventActions, challengeActions } from "../../redux/actions";
import Spinner from "../layout/Spinner";
import TeamFormPlayer from "./TeamFormPlayer";
import TeamFormCategory from "./TeamFormCategory";
import TeamFormEvent from "./TeamFormEvent";
import TeamFormChallenge from "./TeamFormChallenge";

const initialState = {
  user: "",
  name: "",
  institution: "",
  event: "",
  category: "",
  challenge: "",
  players: [],
};

const TeamForm = ({
  auth,
  team: { team, loadingTeam },
  addTeamAction,
  updateTeamAction,
  events,
  getAllEvents,
  challenges,
  getAllChallenges,
}) => {
  const [teamData, setTeamData] = useState(initialState);
  const { user, name, event, category, challenge, players } = teamData;

  //
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [challengeOptions, setChallengeOptions] = useState([]);

  // load form fields
  const teamUpdate = Object.keys(team).length !== 0;
  useEffect(() => {
    if (teamUpdate) {
      // set data to Hooks useState
      const teamData = { ...initialState };
      for (const key in team) {
        if (key in teamData) {
          teamData[key] = team[key];
        }
      }
      setTeamData(teamData);
      // console.log(teamData);

      const _categoryOptions = events
        .filter((event) => event._id === teamData.event)
        .map((event) => event.categories)[0];
      setCategoryOptions(_categoryOptions);
      // console.log({ _categoryOptions });

      const _challengesOptions = challenges.filter((challenge) =>
        challenge.categories.includes(teamData.category)
      );
      setChallengeOptions(_challengesOptions);
      // console.log(_challengesOptions);
    }
    // eslint-disable-next-line
  }, [team]);

  // load users if is Admin creator of team
  useEffect(() => {
    if (auth.userAuth.role === "Admin") {
      console.log("getAllUsers()");
    } else if (auth.userAuth.role === "User") {
      setTeamData({
        ...teamData,
        user: auth.userAuth.id,
        institution: auth.userAuth.institution,
      });
    } else {
      console.log("No autorizado para crear equipo");
    }
    // eslint-disable-next-line
  }, [auth]);

  // load events for select
  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  // load challenges options for select
  useEffect(() => {
    getAllChallenges();
  }, [getAllChallenges]);

  const handleChange = (e) => {
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

  const addPlayer = (player, index) => {
    const _players = players;
    _players[index] = player;
    setTeamData({ ...teamData, players: _players });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teamUpdate) {
      updateTeamAction(team._id, teamData);
    } else {
      addTeamAction(teamData);
      setTeamData(initialState);
    }
  };

  return (
    <Fragment>
      {loadingTeam ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/teams" className="btn btn-sm btn-primary mb-2">
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
                    <label className="col-md-4 col-form-group" htmlFor="user">
                      Entrenador
                    </label>
                    <div className="col-md">
                      <select
                        className="form-control"
                        id="user"
                        name="user"
                        value={user}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="form-group row">
                  <label className="col-md-4 col-form-group" htmlFor="name">
                    Nombre Equipo (*)
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
                <TeamFormPlayer
                  addPlayer={addPlayer}
                  index={0}
                  player={players[0]}
                  required={true}
                />

                <hr />
                <h5>Integrante Equipo #2</h5>
                <TeamFormPlayer
                  addPlayer={addPlayer}
                  index={1}
                  player={players[1]}
                />

                <hr />
                <h5>Integrante Equipo #3</h5>
                <TeamFormPlayer
                  addPlayer={addPlayer}
                  index={2}
                  player={players[2]}
                />

                <hr />
                <h5>Integrante Equipo #4</h5>
                <TeamFormPlayer
                  addPlayer={addPlayer}
                  index={3}
                  player={players[3]}
                />

                <hr />

                <div className="form-row">
                  <button
                    type="submit"
                    className="btn btn-primary m-1"
                    disabled={loadingTeam}
                  >
                    {loadingTeam && (
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
  addTeamAction: teamActions.addTeam,
  updateTeamAction: teamActions.updateTeam,
  getAllEvents: eventActions.getAllEvents,
  getAllChallenges: challengeActions.getAllChallenges,
};

export default connect(mapStateToProps, actionCreators)(TeamForm);
