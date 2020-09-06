import React, { useState } from "react"
import { Link } from "react-router-dom"

const UserList = ({ match }) => {
  const { path } = match
  const [users, setUsers] = useState(null)

  return (
    <div>
      <h2>Administrar Usuarios</h2>
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
        <tbody></tbody>
      </table>
    </div>
  )
}

export default UserList
