import React from "react"
import { Route, Switch } from "react-router-dom"
import DashboardAdmin from "./dashboard/DashboardAdmin"
import Users from "./users/Users"
import Events from "./events/Events"

const Admin = ({ match }) => {
  const { path } = match

  return (
    <Switch>
      <Route exact path={path} component={DashboardAdmin} />
      <Route path={`${path}/users`} component={Users} />
      <Route path={`${path}/events`} component={Events} />
    </Switch>
  )
}

export default Admin
