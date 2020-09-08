import React from "react"
import { Route, Switch } from "react-router-dom"
import UserList from "./UserList"
import UserEdit from "./UserEdit"
import UserForm from "./UserForm"

const Users = ({ match }) => {
  const { path } = match
  return (
    <Switch>
      <Route exact path={path} component={UserList} />
      <Route path={`${path}/add`} component={UserForm} />
      <Route path={`${path}/edit/:id`} component={UserEdit} />
    </Switch>
  )
}

export default Users
