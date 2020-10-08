import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { teamActions, challengeActions, eventActions } from "../../redux/actions";
import ButtonBack from "../layout/ButtonBack";
import { Spinner } from "react-bootstrap";
import ChallengeResultTeamIteam from "./ChallengeResultTeamIteam";

const ChallengeResults = ({
  userAuth,
  team: { teams, loading },
  getTeams,
  event,
  getEventBySlug,
  challenge,
  getChallengeBySlug,
  match,
}) => {
  /** Get teams */

  const { eventSlug, challengeSlug } = match.params;

  useEffect(() => {
    getEventBySlug(eventSlug);
    getChallengeBySlug(challengeSlug);
  }, [getEventBySlug, getChallengeBySlug, eventSlug, challengeSlug]);

  useEffect(() => {
    if (!challenge.loading && !event.loading) {
      getTeams({
        event: event._id,
        challenge: challenge._id,
        registered: true,
      });
    }
  }, [challenge.loading, event.loading, challenge._id, event._id, getTeams]);

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
          .slice(-max)
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

  /** Return */
  return (
    <Fragment>
      {loading || event.loading || challenge.loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Fragment>
          <ButtonBack className="btn btn-primary mr-1 my-2">Atrás</ButtonBack>
          <div className="card  my-4">
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
                      <ChallengeResultTeamIteam
                        key={team._id}
                        index={index + 1}
                        team={team}
                        challenge={challenge}
                        event={event}
                        userAuth={userAuth}
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
  userAuth: state.auth.userAuth,
  team: state.team,
  event: state.event.event,
  challenge: state.challenge.challenge,
});

const actionCreators = {
  getTeams: teamActions.getTeams,
  getEventBySlug: eventActions.getEventBySlug,
  getChallengeBySlug: challengeActions.getChallengeBySlug,
};

export default connect(mapStateToProps, actionCreators)(ChallengeResults);
