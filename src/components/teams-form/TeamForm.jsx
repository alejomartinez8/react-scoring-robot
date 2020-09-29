import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { userActions, teamActions, eventActions } from "../../redux/actions";
import Spinner from "../layout/Spinner";
import ButtonBack from "../layout/ButtonBack";
import TeamFormPlayer from "./TeamFormPlayer";
import TeamFormCategory from "./TeamFormCategory";
import TeamFormEvent from "./TeamFormEvent";
import TeamFormChallenge from "./TeamFormChallenge";

const initialState = {
  user: {},
  event: {},
  challenge: {},
  name: "",
  category: "",
  players: [],
};

const TeamForm = ({
  auth,
  users,
  team: { team, loading },
  events,
  getTeamById,
  addTeamAction,
  updateTeamAction,
  getAllEvents,
  getAllUsers,
  match,
}) => {
  // load events for select
  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  // load team
  useEffect(() => {
    if (match.params.id) {
      getTeamById(match.params.id);
    }
  }, [getTeamById, match.params.id]);

  // load form fields
  useEffect(() => {
    if (match.params.id && events.length > 0 && Object.entries(team).length > 0) {
      const teamData = { ...initialState };
      for (const key in team) {
        if (key in teamData) {
          teamData[key] = team[key];
        }
      }
      setFormData(teamData);
      console.log(teamData);

      const _event = events.filter((elm) => elm._id === teamData.event._id);

      // Set Category Options
      const _categoryOptions = _event.map((event) => event.categories)[0];
      setCategoryOptions(_categoryOptions);

      // Set Challenge Options
      if (_event.length > 0) {
        const _challengesOptions = _event[0].challenges
          .filter((elm) => elm.categories.includes(teamData.category))
          .map((elm) => ({ _id: elm._id, name: elm.name, slug: elm.slug }));
        setChallengeOptions(_challengesOptions);
      }
    }
  }, [team, events, match.params.id]);

  const [formData, setFormData] = useState(initialState);
  const { user, event, challenge, name, category, players } = formData;
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [challengeOptions, setChallengeOptions] = useState([]);

  // load users if is Admin creator of team
  useEffect(() => {
    if (auth.userAuth.role === "Admin") {
      getAllUsers();
    } else if (auth.userAuth.role === "User") {
      setFormData({
        ...formData,
        user: auth.userAuth.id,
      });
    }
    // eslint-disable-next-line
  }, [auth]);

  const handleChange = (e) => {
    console.log(e.target.value);
    switch (e.target.name) {
      case "user":
        setFormData({
          ...formData,
          user: e.target.value
            ? users.find((elm) => elm.id === e.target.value)
            : { _id: "" },
        });
        break;

      case "event":
        setFormData({
          ...formData,
          event: e.target.value
            ? events.find((elm) => elm._id === e.target.value)
            : { _id: "" },
        });
        // setCategoryOptions
        const _categoryOptions = events
          .filter((elm) => elm._id === e.target.value)
          .map((elm) => elm.categories)[0];
        setCategoryOptions(_categoryOptions);
        break;

      case "category":
        setFormData({ ...formData, category: e.target.value });
        //setChallengeOptions
        const _challengesOptions = events
          .filter((elm) => elm._id === event._id)[0]
          .challenges.filter((elm) => elm.categories.includes(e.target.value))
          .map((elm) => ({ _id: elm._id, name: elm.name }));
        setChallengeOptions(_challengesOptions);
        break;

      case "challenge":
        setFormData({
          ...formData,
          challenge: e.target.value
            ? challengeOptions.find((elm) => (elm._id = e.target.value))
            : { _id: "" },
        });
        break;

      default:
        setFormData({ ...formData, [e.target.name]: e.target.value });
        break;
    }
  };

  const addPlayer = (player, index) => {
    const _players = players;
    _players[index] = player;
    setFormData({ ...formData, players: _players });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const teamToSend = {
      user: users.find((elm) => elm.id === user._id),
      // .map((elm) => ({ _id: elm.id, name: elm.name })),
      event: events
        .filter((elm) => elm._id === event._id)
        .map((obj) => ({ _id: obj._id, slug: obj.slug, name: obj.name }))[0],
      challenge: events
        .filter((elm) => elm._id === event._id)[0]
        .challenges.filter((elm) => elm._id === challenge._id)
        .map((obj) => ({ _id: obj._id, slug: obj.slug, name: obj.name }))[0],
      name,
      category,
      players,
    };

    console.log(teamToSend);

    if (match.params.id) {
      updateTeamAction(team._id, teamToSend);
    } else {
      addTeamAction(teamToSend);
      setFormData(initialState);
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <ButtonBack className="btn btn-secondary m-1">Atrás</ButtonBack>
          <div className="card shadow mb-2">
            <div className="card-header">
              <h2 className="text-primary">
                {!match.params.id ? "Agregar Equipo" : "Editar Equipo"}
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
                        value={user._id}
                        onChange={handleChange}
                        required
                      >
                        <option value=""></option>
                        {users
                          .filter((user) => user.role === "User")
                          .map((user) => (
                            <option key={user._id} value={user._id}>
                              {`${user.firstName} ${user.lastName}`}
                            </option>
                          ))}
                      </select>
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
                  event={event._id}
                  handleChange={handleChange}
                />

                <TeamFormCategory
                  options={categoryOptions}
                  category={category}
                  handleChange={handleChange}
                />

                <TeamFormChallenge
                  options={challengeOptions}
                  challenge={challenge._id}
                  handleChange={handleChange}
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
                    disabled={loading}
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    Guardar
                  </button>
                  <ButtonBack className="btn btn-secondary m-1">Cancelar</ButtonBack>
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
  users: state.user.users,
  team: state.team,
  events: state.event.events,
});

const actionCreators = {
  getTeamById: teamActions.getTeamById,
  addTeamAction: teamActions.addTeam,
  updateTeamAction: teamActions.updateTeam,
  getAllUsers: userActions.getAllUsers,
  getAllEvents: eventActions.getAllEvents,
};

export default connect(mapStateToProps, actionCreators)(TeamForm);
