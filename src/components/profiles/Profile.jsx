import React from "react"
import { Route, Switch } from "react-router-dom"
import ProfileUpdate from "./ProfileUpdate"
import ProfileDetail from "./ProfileDetail"

const Profile = ({ match }) => {
  const { path } = match
  return (
    <Switch>
      <Route exact path={path} component={ProfileDetail} />
      <Route path={`${path}/edit-profile`} component={ProfileUpdate} />
    </Switch>
  )
}

export default Profile
