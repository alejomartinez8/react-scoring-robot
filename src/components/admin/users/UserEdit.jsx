import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getUserById } from "../../../redux/actions/user.actions"
import UserForm from "./UserForm"

const UserEdit = ({ getUserById, user: { user }, match }) => {
  useEffect(() => {
    getUserById(match.params.id)
  }, [getUserById, match.params.id])

  return <UserForm user={user} />
}

const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps, { getUserById })(UserEdit)
