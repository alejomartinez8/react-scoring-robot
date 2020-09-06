import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { getAllUsers, deleteUser } from "../../../redux/actions/user.actions"
import Spinner from "../../../components/layout/Spinner"

const UserList = ({ match, users, getAllUsers, deleteUser }) => {
  const { path } = match

  useEffect(() => {
    getAllUsers()
  }, [getAllUsers, deleteUser])

  return (
    <div>
      <h1>Administrar Usuarios</h1>
      <p>
        Administra tus usuarios (sólo Administradores puede acceder a esta sección)
      </p>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar Usuario
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    to={`${path}/edit/${user.id}`}
                    className="btn btn-sm btn-primary mr-1"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => {
                      getAllUsers()
                    }}
                    className="btn btn-sm btn-danger"
                  >
                    <span>Eliminar</span>
                  </button>
                </td>
              </tr>
            ))}
          {!users && (
            <tr>
              <td colSpan="4" className="text-center">
                <Spinner />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
  users: state.auth.users,
})

export default connect(mapStateToProps, { getAllUsers, deleteUser })(UserList)
