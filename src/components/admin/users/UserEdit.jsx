import React, { useEffect } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { getUserById } from "../../../redux/actions/user.actions"
import UserForm from "./UserForm"

const UserEdit = ({ getUserById, userToUpdate, match }) => {
  useEffect(() => {
    getUserById(match.params.id)
  }, [getUserById, match.params.id])

  return <UserForm userToUpdate={userToUpdate} />
}

UserEdit.propTypes = {
  getUserById: PropTypes.func.isRequired,
  userToUpdate: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  loadingUser: state.auth.loadingUser,
  userToUpdate: state.auth.userToUpdate,
})

export default connect(mapStateToProps, { getUserById })(UserEdit)
