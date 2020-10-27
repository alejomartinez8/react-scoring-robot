import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { teamActions, challengeActions, eventActions } from "../../../redux/actions";
import ButtonBack from "../../layout/ButtonBack";
import { Spinner } from "react-bootstrap";
import ChallengeResultTeamItem from "./ChallengeResultTeamItem";

const ChallengeResults = ({
  auth,
  team: { teams, loading },
  getTeams,
  event,
  getEventBySlug,
  challenge,
  getChallengeBySlug,
  deleteScore,
  updateScore,
  match,
}) => {
  /** Get teams */

  const { eventSlug, challengeSlug } = match.params;

  useEffect(() => {
    getEventBySlug(eventSlug);
    getChallengeBySlug(challengeSlug);
  }, [getEventBySlug, getChallengeBySlug, eventSlug, challengeSlug]);

  useEffect(() => {
    if (Object.keys(challenge).length > 0 && Object.keys(event).length > 0) {
      getTeams({
        event: event._id,
        challenge: challenge._id,
        registered: true,
      });
    }
  }, [challenge, event, challenge._id, event._id, getTeams]);

  /** Sum all turns */
  const sumAllTurn = (arr) => {
    return arr.length > 0
      ? arr.map((elm) => elm.totalPoints).reduce((acc, val) => acc + val)
      : 0;
  };

  /** sum Top turns */
  const sumTopTurns = (arr, max) => {
    return arr.length > 0
      ? arr
          .map((elm) => elm.totalPoints)
          .sort((a, b) => b - a)
          .slice(0, max)
          .reduce((acc, val) => acc + val)
      : 0;
  };

  /** Sort Teams */
  const sortTeams = (teams) => {
    let sortTeams = teams.map((team) => ({
      ...team,
      topPoints: sumTopTurns(team.turns, challenge.topMaxTurns),
      totalPoints: sumAllTurn(team.turns),
    }));

    sortTeams = sortTeams.sort((a, b) =>
      b.topPoints - a.topPoints === 0
        ? b.totalPoints - a.totalPoints
        : b.topPoints - a.topPoints
    );
    return sortTeams;
  };

  let sortedTeams = [];

  if (teams.length > 0) {
    sortedTeams = sortTeams(teams);
  }

  const handleDeleteScore = (scoreId) => {
    const postQuery = {
      event: event._id,
      challenge: challenge._id,
      registered: true,
    };
    deleteScore(scoreId, postQuery);
  };

  const handleUpdateScore = (scoreId, params) => {
    const postQuery = {
      event: event._id,
      challenge: challenge._id,
      registered: true,
    };
    updateScore(scoreId, params, postQuery);
  };

  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (seconds === 0) {
      setSeconds(30);
      if (Object.keys(challenge).length > 0 && Object.keys(event).length > 0) {
        getTeams({
          event: event._id,
          challenge: challenge._id,
          registered: true,
        });
      }
    }
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [seconds]);

  /** Return */
  return (
    <Fragment>
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Fragment>
          <div className="d-flex d-flex justify-content-between align-items-center my-2">
            <div>
              <ButtonBack className="btn btn-primary m-2">Atrás</ButtonBack>
              {auth.isAuth &&
                (auth.userAuth.role === "Admin" ||
                  auth.userAuth.role === "Judge") && (
                  <Link
                    to={`/events/${match.params.eventSlug}/${match.params.challengeSlug}/score`}
                    className="btn btn-warning m-2"
                  >
                    <i className="fas fa-tasks"></i> Calificar
                  </Link>
                )}
            </div>
            <button className="btn btn-info m-2" onClick={() => setSeconds(0)}>
              Recargar ( <i className="fas fa-hourglass-start"></i> {seconds} )
            </button>
          </div>

          <div className="card  mb-4">
            <div className="card-header">
              <h2 className="text-primary">
                <i className="fas fa-list"></i> Puntajes reto {challenge.name}
              </h2>
            </div>

            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="thead-light">
                    <tr>
                      <th></th>
                      <th>Puesto</th>
                      <th>Nombre Equipo</th>
                      <th>Institución</th>
                      <th>Ciudad</th>
                      <th>Top Máx ({challenge.topMaxTurns})</th>
                      <th>Acumulado</th>
                      <th>Turnos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedTeams.map((team, index) => (
                      <ChallengeResultTeamItem
                        key={`crti-${team._id}`}
                        index={index}
                        team={team}
                        challenge={challenge}
                        event={event}
                        userAuth={auth.userAuth}
                        handleDeleteScore={handleDeleteScore}
                        handleUpdateScore={handleUpdateScore}
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
  auth: state.auth,
  team: state.team,
  event: state.event.event,
  challenge: state.challenge.challenge,
});

const actionCreators = {
  getTeams: teamActions.getTeams,
  getEventBySlug: eventActions.getEventBySlug,
  getChallengeBySlug: challengeActions.getChallengeBySlug,
  updateScore: teamActions.updateScore,
  deleteScore: teamActions.deleteScore,
};

export default connect(mapStateToProps, actionCreators)(ChallengeResults);
