import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { userActions, teamActions, eventActions } from "../../redux/actions";
import { Spinner } from "react-bootstrap";
import ButtonBack from "../layout/ButtonBack";
import TeamInputPlayers from "./TeamInputPlayers";
import TeamSelectCategories from "./TeamSelectCategories";
import TeamSelectEvents from "./TeamSelectEvents";
import TeamSelectChallenges from "./TeamSelectChallenges";

const initialState = {
  // user: {},
  event: {},
  challenge: {},
  name: "",
  institution: "",
  category: "",
  city: "",
  country: "",
  players: [],
  registered: false,
};

const TeamForm = ({
  auth,
  // users,
  team: { team, loading },
  events,
  getTeamById,
  addTeamAction,
  updateTeamAction,
  getEvents,
  getUsers,
  match,
}) => {
  const [formData, setFormData] = useState(initialState);
  const {
    event,
    challenge,
    name,
    institution,
    city,
    country,
    category,
    players,
    registered,
  } = formData;
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [challengeOptions, setChallengeOptions] = useState([]);

  // load events for select
  useEffect(() => {
    getEvents();
  }, [getEvents]);

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

      const _event = events.filter((elm) => elm._id === teamData.event);

      // Set Category Options
      const _categoryOptions = _event.map((event) => event.categories)[0];
      setCategoryOptions(_categoryOptions);

      // Set Challenge Options
      if (_event.length > 0) {
        const _challengesOptions = _event[0].challenges
          .filter((elm) => elm.categories.includes(teamData.category))
          .map((elm) => ({ _id: elm._id, name: elm.name }));
        setChallengeOptions(_challengesOptions);
      }
    }
  }, [team, events, match.params.id]);

  // load users if is Admin creator of team
  useEffect(() => {
    if (auth.userAuth.role === "Admin") {
      getUsers();
    } else if (auth.userAuth.role === "User") {
      setFormData({
        ...formData,
        user: auth.userAuth.id,
      });
    }
    // eslint-disable-next-line
  }, [auth]);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "user":
        setFormData({
          ...formData,
          user: e.target.value,
        });
        break;

      case "event":
        setFormData({
          ...formData,
          event: e.target.value,
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
          .filter((elm) => elm._id === event)[0]
          .challenges.filter((elm) => elm.categories.includes(e.target.value))
          .map((elm) => ({ _id: elm._id, name: elm.name }));
        setChallengeOptions(_challengesOptions);
        break;

      case "challenge":
        setFormData({
          ...formData,
          challenge: e.target.value,
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

    if (match.params.id) {
      updateTeamAction(team._id, formData);
      setFormData(initialState);
      getTeamById(match.params.id);
    } else {
      addTeamAction(formData);
      setFormData(initialState);
    }
  };

  const setPlayersFrom = (eventId) => {
    const eventSelected = events.find((event) => event._id === eventId);
    if (eventSelected) {
      let playersTemp = [];
      for (let index = 0; index < eventSelected.maxPlayersTeam; index++) {
        playersTemp[index] = (
          <Fragment key={index}>
            <hr />
            <h5>Integrante #{index + 1}</h5>
            <TeamInputPlayers
              key={index}
              addPlayer={addPlayer}
              index={index}
              player={players[index]}
              // required={index < eventSelected.minPlayersTeam}
            />
          </Fragment>
        );
      }
      return playersTemp;
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Fragment>
          <ButtonBack className="btn btn-primary mr-1 my-2">Atrás</ButtonBack>
          <div className="card  mb-2">
            <div className="card-header">
              <h2 className="text-primary">
                {!match.params.id ? "Agregar Equipo" : "Editar Equipo"}
              </h2>
            </div>

            <div className="card-body">
              <form className="form" onSubmit={handleSubmit}>
                {/*auth.userAuth.role === "Admin" && (
                  <div className="form-group row">
                    <label className="col-md-4 col-form-group" htmlFor="user">
                      Entrenador (*)
                    </label>
                    <div className="col-md">
                      <select
                        className="form-control"
                        id="user"
                        name="user"
                        value={user}
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
                          )*/}

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

                <div className="form-group row">
                  <label className="col-md-4 col-form-group" htmlFor="institution">
                    Institución
                  </label>
                  <div className="col-md">
                    <input
                      type="text"
                      className="form-control"
                      id="institution"
                      name="institution"
                      value={institution}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-md-4 col-form-group" htmlFor="city">
                    Ciudad
                  </label>
                  <div className="col-md">
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      name="city"
                      value={city}
                      onChange={handleChange}
                      
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-md-4 col-form-group" htmlFor="country">
                    País
                  </label>
                  <div className="col-md">
                    <input
                      type="text"
                      className="form-control"
                      id="country"
                      name="country"
                      value={country}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <TeamSelectEvents
                  options={events.filter(
                    (event) => event.active && event.stage === "registration"
                  )}
                  event={event}
                  handleChange={handleChange}
                />

                <TeamSelectCategories
                  options={categoryOptions}
                  category={category}
                  handleChange={handleChange}
                />

                <TeamSelectChallenges
                  options={challengeOptions}
                  challenge={challenge}
                  handleChange={handleChange}
                />

                {auth.userAuth.role === "Admin" && (
                  <div className="form-group row">
                    <label className="col-md-4 col-form-group" htmlFor="user">
                      Registrar
                    </label>
                    <div className="col-md">
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={registered}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              registered: e.target.checked,
                            })
                          }
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                )}

                {setPlayersFrom(event)}

                <hr />
                <div className="form-row">
                  <button
                    type="submit"
                    className="btn btn-primary mr-2 mb-2"
                    disabled={loading}
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    Guardar
                  </button>
                  <ButtonBack className="btn btn-outline-primary mr-2 mb-2">
                    Cancelar
                  </ButtonBack>
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
  // users: state.user.users,
  team: state.team,
  events: state.event.events,
});

const actionCreators = {
  getTeamById: teamActions.getTeamById,
  addTeamAction: teamActions.addTeam,
  updateTeamAction: teamActions.updateTeam,
  getUsers: userActions.getUsers,
  getEvents: eventActions.getEvents,
};

export default connect(mapStateToProps, actionCreators)(TeamForm);
