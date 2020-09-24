import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { eventActions, challengeActions, teamActions } from "../../redux/actions";
import styled from "styled-components";
import ButtonBack from "../layout/ButtonBack";
import Spinner from "../layout/Spinner";

const Input = styled.input`
  width: 30px;
  height: 30px;
  margin: 5px;
`;

const initalState = {
  team: "",
  event: "",
  challenge: "",
  tasks: [],
  penalties: [],
  totalPoints: 0,
};

const ScoreForm = ({
  challenge: { challenge, loading },
  getChallengeBySlug,
  teams,
  getTeams,
  match,
  event,
  getEventBySlug,
}) => {
  const [formData, setFormData] = useState(initalState);
  const [penaltyFlag, setPenaltyFlag] = useState(false);

  const { team, tasks, penalties, totalPoints } = formData;

  useEffect(() => {
    getChallengeBySlug(match.params.challengeSlug);
    getEventBySlug(match.params.eventSlug);
    // eslint-disable-next-line
  }, [getChallengeBySlug, getEventBySlug]);

  useEffect(() => {
    if (Object.keys(challenge).length !== 0 && Object.keys(event).length !== 0) {
      const _tasks = [];
      const _penalties = [];
      for (const key in challenge.tasks) {
        _tasks[key] = false;
        _penalties[key] = false;
      }
      setFormData({
        ...formData,
        tasks: _tasks,
        penalties: _penalties,
        challenge: challenge._id,
        event: event._id,
      });

      setPenaltyFlag(
        !!challenge.tasks.map((elm) => elm.penalty).reduce((acc, elm) => acc + elm)
      );

      getTeams({ challenge: challenge._id, event: event._id });
    }
    // eslint-disable-next-line
  }, [challenge, event]);

  // handleChangeInputs
  const handleChangeInputs = (e, inputs, penalty = false) => {
    // console.log(e.target.name);
    const _inputs = inputs;
    _inputs[e.target.name] = e.target.checked;

    const total = !penalty
      ? calcTotalPoints(_inputs, penalties)
      : calcTotalPoints(tasks, _inputs);
    if (!penalty) {
      setFormData({ ...formData, tasks: _inputs, totalPoints: total });
    } else {
      setFormData({ ...formData, penalties: _inputs, totalPoints: total });
    }
  };

  // Disable next or before input
  const checkDisabledTask = (index) => {
    return (
      challenge.taskSecuence &&
      ((tasks[index - 1] === undefined ? false : !tasks[index - 1]) ||
        tasks[index + 1])
    );
  };

  // calcTotalPoint
  const calcTotalPoints = (tasks, penalty) => {
    // console.log(challenge.tasks, tasks, penalty);
    const total = challenge.tasks
      .map((elm) => elm.points)
      .reduce((acc, elm, index) => acc + elm * tasks[index], 0);

    const penaltyTotal = challenge.tasks
      .map((elm) => elm.penalty)
      .reduce((acc, elm, index) => acc + elm * penalty[index], 0);

    return total - penaltyTotal;
  };

  return (
    <Fragment>
      <div className="card shadow my-4">
        <div className="card-header">
          <h2 className="text-primary">
            {`Calificar ${challenge.name} - ${challenge.categories}`}
          </h2>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="team">Equipo</label>
              <div className="col-sm-4">
                <select
                  className="form-control"
                  name="team"
                  id="team"
                  value={team}
                  onChange={(e) =>
                    setFormData({ ...formData, team: e.target.value })
                  }
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

            {loading ? (
              <Spinner />
            ) : challenge.tasks && challenge.tasks.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-striped ">
                  <thead className="thead-dark">
                    <tr>
                      <th>Tareas</th>
                      {penaltyFlag && <th>Penalidad</th>}

                      {}
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
                              onChange={(e) => handleChangeInputs(e, tasks)}
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
                                  handleChangeInputs(e, penalties, true)
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

            <div className="form-group">
              <label htmlFor="team">Total</label>
              <div className="col-sm-9 display-4">{totalPoints} pts</div>
            </div>

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
              <ButtonBack className="btn btn-secondary m-1">Cancelar</ButtonBack>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  event: state.event.event,
  challenge: state.challenge,
  teams: state.team.teams,
});

const actionCreators = {
  getEventBySlug: eventActions.getEventBySlug,
  getChallengeBySlug: challengeActions.getChallengeBySlug,
  getTeams: teamActions.getTeams,
};

export default connect(mapStateToProps, actionCreators)(ScoreForm);
