import React from "react"
import { Route, Switch } from "react-router-dom"
import UserList from "./UserList"
import UserEdit from "./UserEdit"
import AddUser from "./AddUser"

const Users = ({ match }) => {
  const { path } = match
  return (
    <Switch>
      <Route exact path={path} component={UserList} />
      <Route path={`${path}/add`} component={AddUser} />
      <Route path={`${path}/edit/:id`} component={UserEdit} />
    </Switch>
  )
}

export default Users
