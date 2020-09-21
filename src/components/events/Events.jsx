import React from "react";
import { Route, Switch } from "react-router-dom";
import EventGrid from "./EventsGrid";
import EventDetail from "./EventDetail";
import ChallengeResults from "../challenges/ChallengeResults";
import ChallengePlayoffs from "../challenges/ChallengePlayoffs";

const Events = ({ match }) => {
  const { path } = match;
  return (
    <Switch>
      <Route exact path={path} component={EventGrid} />
      <Route exact path={`${path}/:shortName`} component={EventDetail} />
      <Route
        path={`${path}/:shortName/:challengeId/results`}
        component={ChallengeResults}
      />
      <Route
        path={`${path}/:shortName/:challengeId/playoffs`}
        component={ChallengePlayoffs}
      />
    </Switch>
  );
};

export default Events;
