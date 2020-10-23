import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  eventActions,
  challengeActions,
  teamActions,
  alertActions,
} from "../../../redux/actions";
import styled from "styled-components";
import ButtonBack from "../../layout/ButtonBack";
import { Spinner } from "react-bootstrap";

const Input = styled.input`
  width: 30px;
  height: 30px;
  margin: 5px;
`;

const initalState = {
  tasks: [],
  penalties: [],
  taskPoints: 0,
  bonusPoints: 0,
  totalPoints: 0,
  judgeName: "",
};

const CallengeScoreForm = ({
  userAuth,
  event,
  eventLoading,
  challenge,
  challengeLoading,
  teams,
  teamsLoading,
  getEventBySlug,
  getChallengeBySlug,
  getTeams,
  addScore,
  setAlert,
  turn = {},
  handleUpdateScore,
  match,
}) => {
  // load event and challenge by slug
  let challengeSlug = "";
  let eventSlug = "";

  if (Object.keys(turn).length === 0) {
    challengeSlug = match.params.challengeSlug;
    eventSlug = match.params.eventSlug;
  }

  // use states vars
  const [formData, setFormData] = useState(initalState);
  const [penaltyFlag, setPenaltyFlag] = useState(false);
  const [team, setTeam] = useState("");
  const { tasks, penalties, taskPoints, bonusPoints, totalPoints } = formData;

  // get Event and Challenge by Slug
  useEffect(() => {
    if (Object.keys(turn).length === 0) {
      getEventBySlug(eventSlug);
      getChallengeBySlug(challengeSlug);
    }
    // eslint-disable-next-line
  }, [getChallengeBySlug, getEventBySlug, challengeSlug, eventSlug]);

  // load teams to qualify
  useEffect(() => {
    if (!eventLoading && !challengeLoading) {
      if (Object.keys(turn).length > 0) {
        setFormData({ ...formData, ...turn });
        setTeam(turn.teamId);
      } else {
        getTeams({
          challenge: challenge._id,
          event: event._id,
        });
      }

      if ("tasks" in challenge) {
        setPenaltyFlag(
          challenge.tasks
            .map((task) => parseInt(task.penalty))
            .reduce((acc, elm) => acc + elm) > 0
        );
      }
    }
    // eslint-disable-next-line
  }, [getTeams, eventLoading, challengeLoading, challenge]);

  // load task challenge score form
  useEffect(() => {
    if (!teamsLoading && !challengeLoading) {
      if (Object.keys(turn).length > 0) {
      } else {
        resetTaskToForm();
      }
    }
    // eslint-disable-next-line
  }, [teams]);

  // reset Tasks Form
  function resetTaskToForm() {
    const _tasks = [];
    const _penalties = [];
    for (const key in challenge.tasks) {
      _tasks[key] = false;
      _penalties[key] = false;
    }
    setFormData({
      tasks: _tasks,
      penalties: _penalties,
      taskPoints: 0,
      bonusPoints: 0,
      totalPoints: 0,
      judgeName: userAuth.fullName,
    });

    setSeconds(challenge.maxTime);
    setTimer(false);
    setTeam("");
  }

  // handleChangeTasks
  const handleChangeTasks = (e, inputs, penalty = false) => {
    const _inputs = inputs;
    _inputs[e.target.name] = e.target.checked;

    const points = !penalty
      ? calcTaskPoints(_inputs, penalties)
      : calcTaskPoints(tasks, _inputs);

    if (!penalty) {
      setFormData({
        ...formData,
        tasks: _inputs,
        taskPoints: points,
        totalPoints: points + bonusPoints,
      });

      if (tasks[tasks.length - 1]) {
        if (challenge.stopTime) {
          setTimer(false);
        }

        if (challenge.bonusType === "timer") {
          setFormData({
            ...formData,
            tasks: _inputs,
            taskPoints: points,
            bonusPoints: seconds,
            totalPoints: points + seconds,
          });
        }
      }
    } else {
      setFormData({
        ...formData,
        penalties: _inputs,
        taskPoints: points,
        totalPoints: points + bonusPoints,
      });
    }
  };

  const handleTeams = (e) => {
    const verifyTeam = teams.find((team) => team._id === e.target.value);
    if (!!verifyTeam && verifyTeam.turnCounter >= challenge.maxTurns) {
      setAlert("Este equipo ha alcanzado el máximo de turnos posible", "danger");
    } else {
      setTeam(e.target.value);
    }
  };

  // Disable next or before input
  const checkDisabledTask = (index) => {
    return (
      !timer ||
      (challenge.taskSecuence &&
        ((tasks[index - 1] === undefined ? false : !tasks[index - 1]) ||
          tasks[index + 1]))
    );
  };

  // Calc task points
  const calcTaskPoints = (tasks, penalty) => {
    // console.log(challenge.tasks, tasks, penalty);
    const total = challenge.tasks
      .map((elm) => elm.points)
      .reduce((acc, elm, index) => acc + elm * tasks[index], 0);

    const penaltyTotal = challenge.tasks
      .map((elm) => elm.penalty)
      .reduce((acc, elm, index) => acc + elm * penalty[index], 0);
    return total - penaltyTotal;
  };

  /********** Timer *************/
  const [timer, setTimer] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (seconds === 0) {
      setTimer(false);
    }

    if (timer) {
      const interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, seconds]);

  // handle stop or start Timer
  const handleSetTimer = (e) => {
    e.preventDefault();
    if (team) {
      setTimer(!timer);
    } else {
      setAlert("Debes elegir un equipo", "warning");
    }
  };

  // handle restart timer
  const handleRestartTimer = (e) => {
    e.preventDefault();
    setSeconds(challenge.maxTime);
  };

  /***********Submit *********/
  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(turn).length === 0) {
      addScore(team, formData, () => {
        getTeams({
          challenge: challenge._id,
          event: event._id,
        });
        resetTaskToForm();
      });
    } else {
      handleUpdateScore(turn._id, formData);
      console.log("acutalizar turno", formData);
    }
  };

  /**** Return *****/
  return (
    <Fragment>
      {eventLoading || challengeLoading || teamsLoading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Fragment>
          <ButtonBack className="btn btn-primary mr-1 my-2">Atrás</ButtonBack>

          <div className="card mb-4">
            <div className="card-header">
              <h2 className="text-primary">
                {Object.keys(turn).length > 0
                  ? `Editar Turno`
                  : `Calificar ${challenge.name} - ${challenge.categories}`}
              </h2>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {!Object.keys(turn).length && (
                  <Fragment>
                    {/* ************* Team Info ************* */}
                    <div className="form-group">
                      <label htmlFor="team">Equipo</label>
                      <div className="col-sm-4">
                        <select
                          className="form-control"
                          name="team"
                          id="team"
                          value={team}
                          onChange={handleTeams}
                          required
                        >
                          <option value=""></option>
                          {teams.map((team) => (
                            <option key={team._id} value={team._id}>
                              {team.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <hr />
                    <div className="form-group my-2 text-center">
                      <div className="lead">
                        Turno(s):{" "}
                        {team !== ""
                          ? teams
                              .filter((elm) => elm._id === team)
                              .map((elm) => elm.turnCounter)[0]
                          : 0}{" "}
                        de {challenge.maxTurns}
                      </div>
                    </div>

                    {/************ Timer ************/}
                    <hr />
                    <div className="form-group row my-2 justify-content-center align-items-center">
                      <div className="display-4">
                        <i className="fas fa-hourglass-start"></i> {seconds} (s)
                      </div>

                      <div>
                        <button
                          onClick={handleSetTimer}
                          className={
                            !timer ? "btn btn-primary m-2" : "btn btn-danger m-2"
                          }
                        >
                          {!timer ? (
                            <>
                              <i className="fas fa-play"></i> Iniciar
                            </>
                          ) : (
                            <>
                              <i className="fas fa-stop"></i> Parar
                            </>
                          )}
                        </button>
                        <button
                          onClick={handleRestartTimer}
                          className="btn btn-warning m-2"
                        >
                          Reiniciar
                        </button>
                      </div>
                    </div>

                    <hr />
                  </Fragment>
                )}

                {challengeLoading ? (
                  <Spinner animation="border" variant="primary" />
                ) : challenge.tasks && challenge.tasks.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-striped ">
                      <thead className="thead-dark">
                        <tr>
                          <th>Tareas</th>
                          {penaltyFlag && <th>Penalidad</th>}
                        </tr>
                      </thead>

                      <tbody>
                        {challenge.tasks.map((task, index) => (
                          <tr key={index}>
                            <td>
                              <div className="d-flex align-items-center">
                                <Input
                                  id={index}
                                  name={index}
                                  checked={tasks[index]}
                                  type="checkBox"
                                  onChange={(e) => handleChangeTasks(e, tasks)}
                                  disabled={
                                    checkDisabledTask(index) &&
                                    !Object.keys(turn).length
                                  }
                                />
                                <label
                                  htmlFor={index}
                                >{`${task.label} (${task.points} pts)`}</label>
                              </div>
                            </td>
                            {penaltyFlag && (
                              <td>
                                <div className="d-flex align-items-center">
                                  <Input
                                    id={index}
                                    name={index}
                                    checked={penalties[index]}
                                    type="checkBox"
                                    onChange={(e) =>
                                      handleChangeTasks(e, penalties, true)
                                    }
                                    disabled={!tasks[index]}
                                  />
                                  {`(-${task.penalty} pts)`}
                                </div>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No hay tareas asignadas a este reto</p>
                )}

                {/* Points */}
                <hr />
                <div className="form-group ">
                  <h4>Total Puntos</h4>

                  <div className="form-group">
                    <label>Puntos por Bonus</label>
                    <input
                      type="Number"
                      className="col-sm-4 form-control"
                      name="bonusPoints"
                      value={bonusPoints}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          bonusPoints:
                            e.target.value !== "" ? parseInt(e.target.value) : 0,
                          totalPoints:
                            taskPoints +
                            (e.target.value !== "" ? parseInt(e.target.value) : 0),
                        })
                      }
                    ></input>
                  </div>

                  <div className="d-flex justify-content-center">
                    <span className="display-4 text-center">
                      {taskPoints}{" "}
                      {bonusPoints !== 0 && `+ ${bonusPoints} = ${totalPoints}`} pts
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-primary mx-1"
                    disabled={teamsLoading}
                  >
                    {teamsLoading && (
                      <span className="spinner-border spinner-border-sm m-1"></span>
                    )}
                    Guardar
                  </button>
                  {Object.keys(turn).length === 0 && (
                    <ButtonBack className="btn btn-outline-primary mr-1 my-2">
                      Cancelar
                    </ButtonBack>
                  )}
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
  userAuth: state.auth.userAuth,
  event: state.event.event,
  eventLoading: state.event.loading,
  challenge: state.challenge.challenge,
  challengeLoading: state.challenge.loading,
  teams: state.team.teams,
  teamsLoading: state.team.loading,
});

const actionCreators = {
  getEventBySlug: eventActions.getEventBySlug,
  getChallengeBySlug: challengeActions.getChallengeBySlug,
  getTeams: teamActions.getTeams,
  addScore: teamActions.addScore,
  setAlert: alertActions.setAlert,
};

export default connect(mapStateToProps, actionCreators)(CallengeScoreForm);
