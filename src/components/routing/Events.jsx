import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import EventsPage from "../events/EventsPage";
import ChallengesGrid from "../challenges/ChallengesGrid";
import ChallengeResults from "../challenges/results/ChallengeResults";
import ChallengePlayoffs from "../challenges/playoffs/ChallengePlayoffs";
import ChallengeScoreForm from "../challenges/score/ChallengeScoreForm";

const Events = () => {
  return (
    <Switch>
      <Route exact path="/events" component={EventsPage} />
      {/* Challenges */}
      <Route exact path={"/events/:eventSlug"} component={ChallengesGrid} />
      <Route
        path={"/events/:eventSlug/:challengeSlug/results"}
        component={ChallengeResults}
      />
      <Route
        path={"/events/:eventSlug/:challengeSlug/playoffs"}
        component={ChallengePlayoffs}
      />
      <PrivateRoute
        roles={["Admin", "Judge"]}
        exact
        path={"/events/:eventSlug/:challengeSlug/score"}
        component={ChallengeScoreForm}
      />
      <PrivateRoute
        roles={["Admin"]}
        exact
        path={"/events/:eventSlug/:challengeSlug/score/:turnId"}
        component={ChallengeScoreForm}
      />
    </Switch>
  );
};

export default Events;
