import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { challengeActions, teamActions } from "../../redux/actions";
import styled from "styled-components";
import ButtonBack from "../layout/ButtonBack";

const Input = styled.input`
  width: 30px;
  height: 30px;
  margin: 5px;
`;

const initalState = {
  team: "",
  taskInput: [],
};

const ScoreForm = ({ challenge, getChallengeBySlug, teams, getTeams, match }) => {
  const [formData, setFormData] = useState(initalState);
  const { team, taskInput } = formData;

  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    getChallengeBySlug(match.params.challengeSlug);
  }, [getChallengeBySlug]);

  useEffect(() => {
    if (Object.keys(challenge).length !== 0) {
      const _taskInput = taskInput;
      for (const key in challenge.tasks) {
        _taskInput[key] = false;
      }
      setFormData({ ...formData, taskInput: _taskInput });
      getTeams({ challenge: challenge._id });
    }
  }, [taskInput, challenge]);

  const handleChange = (e) => {
    if (e.target.name === "team") {
      setFormData({ ...formData, team: e.target.value });
    } else {
      const _taskInput = taskInput;
      _taskInput[e.target.name] = e.target.checked;
      setFormData({ ...formData, taskInput: _taskInput });
      calcTotalPoints(challenge.tasks, _taskInput);
    }
  };

  // Disable next or before input
  const checkDisabledTask = (index) => {
    return (
      (taskInput[index - 1] === undefined ? false : !taskInput[index - 1]) ||
      taskInput[index + 1]
    );
  };

  // calcTotalPoint
  const calcTotalPoints = (tasks, _taskInput) => {
    // console.log(tasks, _taskInput);

    const reducer = (accumulator, currentValue, index) => {
      return accumulator + currentValue * _taskInput[index];
    };

    const total = tasks.map((elm) => elm.points).reduce(reducer);
    setTotalPoints(total);
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
              <div className="col-sm-3">
                <select
                  className="form-control"
                  name="team"
                  id="team"
                  value={team}
                  onChange={handleChange}
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

            <div className="table-responsive">
              <table className="table table-striped ">
                <thead className="thead-dark">
                  <tr>
                    <th>Tareas</th>
                  </tr>
                </thead>

                <tbody>
                  {challenge.tasks &&
                    challenge.tasks.map((task, index) => (
                      <tr key={index}>
                        <td>
                          <div className="d-flex align-items-center">
                            <Input
                              id={index}
                              name={index}
                              checked={taskInput[index]}
                              type="checkBox"
                              onChange={handleChange}
                              disabled={checkDisabledTask(index)}
                            />
                            <label
                              htmlFor={index}
                            >{`${task.label} (${task.points} pts)`}</label>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

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
  challenge: state.challenge.challenge,
  teams: state.team.teams,
});

const actionCreators = {
  getChallengeBySlug: challengeActions.getChallengeBySlug,
  getTeams: teamActions.getTeams,
};

export default connect(mapStateToProps, actionCreators)(ScoreForm);
