import React from "react"
import { Route, Switch } from "react-router-dom"
import UserList from "./UserList"

const Users = ({ match }) => {
  const { path } = match
  return (
    <Switch>
      <Route exact path={path} component={UserList} />
    </Switch>
  )
}

export default Users
