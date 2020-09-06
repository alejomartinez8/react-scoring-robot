import React, { Fragment } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { connect } from "react-redux"
import { loadUser } from "./redux/actions/user.actions"
import Routes from "./components/routing/Routes"
import Landing from "./components/layout/Landing"
import Navbar from "./components/layout/Navbar"

const App = ({ loadUser }) => {
  if (localStorage.getItem("token")) {
    loadUser()
  }

  return (
    <BrowserRouter>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route component={Routes} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  )
}

export default connect(null, { loadUser })(App)
