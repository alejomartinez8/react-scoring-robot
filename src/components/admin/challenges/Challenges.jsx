import React from "react";
import { Route, Switch } from "react-router-dom";
import ChallengesList from "./ChallengeList";
import ChallengeForm from "./ChallengeForm";
import ChallengeEdit from "./ChallengeEdit";

const Challenges = ({ match }) => {
  const { path } = match;
  return (
    <Switch>
      <Route exact path={path} component={ChallengesList} />
      <Route path={`${path}/add`} component={ChallengeForm} />
      <Route path={`${path}/edit/:id`} component={ChallengeEdit} />
    </Switch>
  );
};

export default Challenges;
