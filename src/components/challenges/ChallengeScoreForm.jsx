import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  eventActions,
  challengeActions,
  teamActions,
  alertActions,
} from "../../redux/actions";
import styled from "styled-components";
import ButtonBack from "../layout/ButtonBack";
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
};

const CallengeScoreForm = ({
  event: { event },
  challenge: { challenge, loading },
  teams,
  getEventBySlug,
  getChallengeBySlug,
  getTeams,
  addScoreToTeam,
  setAlert,
  match,
}) => {
  // load event and challenge by slug
  const { challengeSlug, eventSlug, turnId } = match.params;
  const eventLoading = Object.keys(event).length === 0;
  const challengeLoading = Object.keys(challenge).length === 0;
  const teamsLoading = Object.keys(teams).length === 0;

  console.log(eventLoading, challengeLoading, teamsLoading);

  // use states vars
  const [formData, setFormData] = useState(initalState);
  const [penaltyFlag, setPenaltyFlag] = useState(false);
  const [team, setTeam] = useState("");
  const { tasks, penalties, taskPoints, bonusPoints, totalPoints } = formData;

  useEffect(() => {
    getChallengeBySlug(challengeSlug);
    getEventBySlug(eventSlug);
  }, [getChallengeBySlug, getEventBySlug, challengeSlug, eventSlug]);

  // load teams to qualify
  useEffect(() => {
    if (!eventLoading && !challengeLoading) {
      if (turnId) {
        getTeams({
          "turns._id": turnId,
        });
      } else {
        getTeams({
          challenge: challenge._id,
          event: event._id,
        });
      }
    }
    // eslint-disable-next-line
  }, [getTeams, eventLoading, challengeLoading, turnId]);

  // load task challenge score form
  useEffect(() => {
    if (!teamsLoading) {
      if (turnId) {
        const turn = teams[0].turns.find((turn) => turn._id === turnId);
        setTeam(teams[0]._id);
        setFormData(turn);
      } else {
        resetTaskToForm();
      }
    }
    // eslint-disable-next-line
  }, [teams, turnId]);

  function resetTaskToForm(turn) {
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
    });

    setPenaltyFlag(
      !!challenge.tasks.map((elm) => elm.penalty).reduce((acc, elm) => acc + elm)
    );

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
        setTimer(false);
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
    setTimer(!timer);
  };

  // handle restart timer
  const handleRestartTimer = (e) => {
    e.preventDefault();
    setSeconds(challenge.maxTime);
  };

  /***********Submit *********/
  const handleSubmit = (e) => {
    e.preventDefault();

    // send Score turn
    addScoreToTeam(team, formData);

    // get Teams again
    getTeams({
      challenge: challenge._id,
      event: event._id,
    });
    // resetForm

    resetTaskToForm();
  };

  /**** Return *****/
  return (
    <Fragment>
      {eventLoading || challengeLoading || teamsLoading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Fragment>
          <div className="card  my-4">
            <div className="card-header">
              <h2 className="text-primary">
                {turnId
                  ? `Editar Turno ${challenge.name} - ${teams[0].name}`
                  : `Calificar ${challenge.name} - ${challenge.categories}`}
              </h2>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
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

                {loading ? (
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
                                  disabled={checkDisabledTask(index) && !turnId}
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
                    // disabled={loading}
                  >
                    {/* {loading && (
              <span className="spinner-border spinner-border-sm m-1"></span>
            )} */}
                    Guardar
                  </button>
                  <ButtonBack className="btn btn-primary mr-1 my-2">
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
  event: state.event,
  challenge: state.challenge,
  teams: state.team.teams,
});

const actionCreators = {
  getEventBySlug: eventActions.getEventBySlug,
  getChallengeBySlug: challengeActions.getChallengeBySlug,
  getTeams: teamActions.getTeams,
  addScoreToTeam: teamActions.addScoreToTeam,
  setAlert: alertActions.setAlert,
};

export default connect(mapStateToProps, actionCreators)(CallengeScoreForm);
