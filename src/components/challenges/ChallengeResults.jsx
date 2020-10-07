import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { teamActions, challengeActions } from "../../redux/actions";
import ButtonBack from "../layout/ButtonBack";
import Spinner from "../layout/Spinner";

const ChallengeResults = ({
  team: { teams },
  getTeams,
  challenge,
  getChallengeBySlug,
  match,
}) => {
  /** Get teams */
  useEffect(() => {
    getChallengeBySlug(match.params.challengeSlug);
  }, [getChallengeBySlug, match.params.challengeSlug]);

  useEffect(() => {
    if (!challenge.loading && challenge._id) {
      getTeams({
        challenge: challenge._id,
        registered: true,
      });
    }
  }, [challenge.loading, challenge._id, getTeams]);

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
    let sortedTeams = teams.map((team) => ({
      ...team,
      topPoints: sumTopTurns(team.turns, challenge.topMaxTurns),
      totalPoints: sumAllTurn(team.turns),
    }));

    sortedTeams = sortedTeams.sort((a, b) =>
      b.topPoints - a.topPoints === 0
        ? b.totalPoints - a.totalPoints
        : b.topPoints - a.topPoints
    );
    return sortedTeams;
  };

  let sortedTeams = [];

  if (teams.length > 0) {
    sortedTeams = sortTeams(teams);
  }

  /** Return */
  return (
    <Fragment>
      {sortedTeams.length === 0 ? (
        <Spinner />
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
                <table className="table table-striped ">
                  <thead className="thead-dark">
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
                    {teams.length > 0 &&
                      sortedTeams.map((team, index) => (
                        <tr key={team._id}>
                          <td>{index + 1}</td>
                          <td>{team.name}</td>
                          <td>{team.user.institution}</td>
                          <td>{team.user.city}</td>
                          <td className="text-center">
                            {sumTopTurns(team.turns, challenge.topMaxTurns)}
                          </td>
                          <td className="text-center">{sumAllTurn(team.turns)}</td>
                          <td>
                            {team.turns.length} de {challenge.maxTurns}
                          </td>
                        </tr>
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
  team: state.team,
  challenge: state.challenge.challenge,
});

const actionCreators = {
  getTeams: teamActions.getTeams,
  getChallengeBySlug: challengeActions.getChallengeBySlug,
};

export default connect(mapStateToProps, actionCreators)(ChallengeResults);
