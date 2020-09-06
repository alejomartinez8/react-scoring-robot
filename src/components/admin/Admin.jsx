import React from "react"
import { Route, Switch } from "react-router-dom"
import DashboardAdmin from "./dashboard/DashboardAdmin"
import Users from "./users/Users"

const Admin = ({ match }) => {
  const { path } = match
  console.log("Admin path:", path)
  return (
    <Switch>
      <Route exact path={path} component={DashboardAdmin} />
      <Route path={`${path}/users`} component={Users} />
    </Switch>
  )
}

export default Admin
