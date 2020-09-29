import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import EventGrid from "../events/EventsGrid";
import ChallengesGrid from "../challenges/ChallengesGrid";
import ChallengeResults from "../challenges/ChallengeResults";
import ChallengePlayoffs from "../challenges/ChallengePlayoffs";
import ChallengeScoreForm from "../challenges/ChallengeScoreForm";

const Events = () => {
  return (
    <Switch>
      <Route exact path="/events" component={EventGrid} />
      {/* Challenges */}
      <Route
        exact
        path={"/events/:eventSlug/challenges"}
        component={ChallengesGrid}
      />
      <Route
        path={"/events/:eventSlug/challenges/:challengeSlug/results"}
        component={ChallengeResults}
      />
      <Route
        path={"/events/:eventSlug/challenges/:challengeSlug/playoffs"}
        component={ChallengePlayoffs}
      />
      <PrivateRoute
        roles={["Admin", "Judge"]}
        path={"/events/:eventSlug/challenges/:challengeSlug/score"}
        component={ChallengeScoreForm}
      />
    </Switch>
  );
};

export default Events;
