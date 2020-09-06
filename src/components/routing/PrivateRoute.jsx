import React from "react"
import { Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Spinner from "../layout/Spinner"

const PrivateRoute = ({
  component: Component,
  roles,
  auth: { isAuth, loading, user },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      console.log({ loading })
      console.log({ isAuth })

      if (loading) {
        return <Spinner />
      } else {
        if (!isAuth) {
          // not logged-in, then redirect to login page with the return url
          return <Redirect to="/user/login" />
        }

        // check if route is restricted by role
        if (roles && roles.indexOf(user.role) === -1) {
          return <Redirect to={{ pathname: "/" }} />
        }

        // athorized so return component
        return <Component {...props} />
      }
    }}
  />
)

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(PrivateRoute)
