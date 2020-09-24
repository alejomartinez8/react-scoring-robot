import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "../routing/PrivateRoute";
import EventGrid from "./EventsGrid";
import ChallengesGrid from "../challenges/ChallengesGrid";
import ChallengeResults from "../challenges/ChallengeResults";
import ChallengePlayoffs from "../challenges/ChallengePlayoffs";
import ScoreForm from "../score/ScoreForm";
import TeamsGrid from "../teams/TeamsGrid";

const Events = ({ match }) => {
  const { path } = match;
  return (
    <Switch>
      <Route exact path={path} component={EventGrid} />
      {/* Challenges */}
      <Route
        exact
        path={`${path}/:eventSlug/challenges`}
        component={ChallengesGrid}
      />
      <Route
        path={`${path}/:eventSlug/challenges/:challengeSlug/results`}
        component={ChallengeResults}
      />
      <Route
        path={`${path}/:eventSlug/challenges/:challengeSlug/playoffs`}
        component={ChallengePlayoffs}
      />
      <PrivateRoute
        roles={["Admin", "Judge"]}
        path={`${path}/:eventSlug/challenges/:challengeSlug/score`}
        component={ScoreForm}
      />
      {/* Teams */}
      <Route exact path={`${path}/:eventSlug/teams`} component={TeamsGrid} />
    </Switch>
  );
};

export default Events;
