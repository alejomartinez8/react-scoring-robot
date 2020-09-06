import React from "react"
import { Route, Switch } from "react-router-dom"
import UserList from "./UserList"
import AddEdit from "./AddEdit"

const Users = ({ match }) => {
  const { path } = match
  return (
    <Switch>
      <Route exact path={path} component={UserList} />
      <Route path={`${path}/add`} component={AddEdit} />
      <Route path={`${path}/edit/:id`} component={AddEdit} />
    </Switch>
  )
}

export default Users
