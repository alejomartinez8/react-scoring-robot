import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "../routing/PrivateRoute";
import EventGrid from "./EventsGrid";
import EventDetail from "./EventDetail";
import ChallengeResults from "../challenges/ChallengeResults";
import ChallengePlayoffs from "../challenges/ChallengePlayoffs";
import ScoreForm from "../score/ScoreForm";

const Events = ({ match }) => {
  const { path } = match;
  return (
    <Switch>
      <Route exact path={path} component={EventGrid} />
      <Route exact path={`${path}/:eventSlug`} component={EventDetail} />
      <Route
        path={`${path}/:eventSlug/:challengeId/results`}
        component={ChallengeResults}
      />
      <Route
        path={`${path}/:eventSlug/:challengeId/playoffs`}
        component={ChallengePlayoffs}
      />
      <PrivateRoute
        roles={["Admin", "Judge"]}
        path={`${path}/:eventSlug/score/:challengeSlug/`}
        component={ScoreForm}
      />
    </Switch>
  );
};

export default Events;
