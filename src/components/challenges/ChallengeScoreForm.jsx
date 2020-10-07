import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { eventActions, challengeActions, teamActions } from "../../redux/actions";
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
  updateTeam,
  match,
}) => {
  // load team
  useEffect(() => {
    getChallengeBySlug(match.params.challengeSlug);
    getEventBySlug(match.params.eventSlug);
  }, [
    getChallengeBySlug,
    getEventBySlug,
    match.params.challengeSlug,
    match.params.eventSlug,
  ]);

  useEffect(() => {
    if (event !== {} && challenge !== {}) {
      console.log(event._id, challenge._id);
      getTeams({
        challenge: challenge._id,
        event: event._id,
      });
    }
  }, [getTeams, challenge, event]);

  // load score form
  useEffect(() => {
    if (Object.keys(challenge).length > 0) {
      resetScoreForm();
    }
    // eslint-disable-next-line
  }, [challenge]);

  function resetScoreForm() {
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

  // use states vars
  const [formData, setFormData] = useState(initalState);
  const [penaltyFlag, setPenaltyFlag] = useState(false);
  const [team, setTeam] = useState("");
  const { tasks, penalties, taskPoints, bonusPoints, totalPoints } = formData;

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
    updateTeam(team, {
      name: teams.find((elm) => elm._id === team).name,
      turns: formData,
    });

    // get Teams again
    getTeams({
      "event.slug": match.params.eventSlug,
      "challenge.slug": match.params.challengeSlug,
    });
    // resetForm

    resetScoreForm();
  };

  /**** Return *****/
  return (
    <Fragment>
      <div className="card  my-4">
        <div className="card-header">
          <h2 className="text-primary">
            <i className="fas fa-tasks"></i>{" "}
            {`Calificar ${challenge.name} - ${challenge.categories}`}
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
                  onChange={(e) => setTeam(e.target.value)}
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
                  className={!timer ? "btn btn-primary m-2" : "btn btn-danger m-2"}
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
                <button onClick={handleRestartTimer} className="btn btn-warning m-2">
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
                              disabled={checkDisabledTask(index)}
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
              <ButtonBack className="btn btn-primary mr-1 my-2">Cancelar</ButtonBack>
            </div>
          </form>
        </div>
      </div>
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
  updateTeam: teamActions.updateTeam,
};

export default connect(mapStateToProps, actionCreators)(CallengeScoreForm);
