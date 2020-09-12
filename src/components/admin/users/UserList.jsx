import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllUsers, deleteUser } from "../../../redux/actions/user.actions";

const UserList = ({ getAllUsers, user: { users }, deleteUser, match }) => {
  const { path } = match;

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const handleDeleteUser = (id) => {
    deleteUser(id);
  };

  return (
    <Fragment>
      <Link to="/admin/">{"< "}Atrás</Link>
      <div className="card shadow mb-4">
        <div className="card-header">
          <h1>Administrar Usuarios</h1>
        </div>

        <div className="card-body">
          <p>
            Administra tus usuarios (sólo Administradores puede acceder a esta
            sección)
          </p>
          <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
            Agregar Usuario
          </Link>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nombre Completo</th>
                <th>Email</th>
                <th>Role</th>
                <th>Institución</th>
                <th>Ciudad</th>
                <th>País</th>
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
                    <td>{user.institution}</td>
                    <td>{user.city}</td>
                    <td>{user.country}</td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      <Link
                        to={`${path}/edit/${user.id}`}
                        className="btn btn-sm btn-primary mr-1"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
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
                    <span className="spinner-border spinner-border-lg align-center"></span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getAllUsers, deleteUser })(UserList);
