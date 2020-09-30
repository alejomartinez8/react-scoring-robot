import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { teamActions, challengeActions } from "../../redux/actions";
import ButtonBack from "../layout/ButtonBack";
import Spinner from "../layout/Spinner";

const ChallengeResults = ({
  team: { teams, loading },
  getTeams,
  challenge,
  getChallengeBySlug,
  match,
}) => {
  useEffect(() => {
    getChallengeBySlug(match.params.challengeSlug);
    getTeams({
      "event.slug": match.params.eventSlug,
      "challenge.slug": match.params.challengeSlug,
    });
  }, [
    getTeams,
    getChallengeBySlug,
    match.params.eventSlug,
    match.params.challengeSlug,
  ]);

  const sumAllTurn = (arr) => {
    return arr.length > 0
      ? arr.map((elm) => elm.totalPoints).reduce((acc, val) => acc + val)
      : 0;
  };

  const sumTopTurns = (arr, max) => {
    return arr.length > 0
      ? arr
          .map((elm) => elm.totalPoints)
          .sort((a, b) => b - a)
          .slice(-max)
          .reduce((acc, val) => acc + val)
      : 0;
  };

  const sortTeams = (teams) => {
    let sortedTeams = teams.map((team) => ({
      ...team,
      topPoints: sumTopTurns(team.turns, challenge.topMaxTurns),
    }));

    sortedTeams = sortedTeams.sort((a, b) => b.topPoints - a.topPoints);
    return sortedTeams;
  };

  let sortedTeams = [];

  if (teams.length > 0) {
    console.log("teams:", teams);
    sortedTeams = sortTeams(teams);
    console.log("sorted teams:", sortedTeams);

    // console.log(teams.map((team) => team.turns));
    // console.log(teams.map((team) => sumAllTurn(team.turns)));
    // console.log(teams.map((team) => sumTopTurns(team.turns, challenge.topMaxTurns)));
  }

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <ButtonBack className="btn btn-secondary m-1">Atrás</ButtonBack>
          <div className="card shadow my-2">
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
