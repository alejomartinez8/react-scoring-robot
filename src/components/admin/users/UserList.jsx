import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { getAllUsers, deleteUser } from "../../../redux/actions/user.actions"

const UserList = ({ getAllUsers, user: { users }, deleteUser, match }) => {
  const { path } = match

  useEffect(() => {
    getAllUsers()
  }, [getAllUsers])

  const handleDeleteUser = () => {}

  return (
    <div className="card shadow">
      <div className="card-header">
        <h1>Administrar Usuarios</h1>
        <p>
          Administra tus usuarios (sólo Administradores puede acceder a esta sección)
        </p>
      </div>

      <div className="card-body">
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
                      onClick={handleDeleteUser}
                      className="btn btn-sm btn-danger"
                    >
                      <span>Eliminar</span>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps, { getAllUsers, deleteUser })(UserList)
