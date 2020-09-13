import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllUsers, deleteUser } from "../../../redux/actions/user.actions";
import Spinner from "../../layout/Spinner";

const UserList = ({ getAllUsers, user: { users, loading }, deleteUser, match }) => {
  const { path } = match;

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const handleDeleteUser = (id) => {
    deleteUser(id);
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/admin/" className="btn btn-sm btn-primary mb-2">
            Atrás
          </Link>
          <div className="card shadow mb-4">
            <div className="card-header">
              <h2 className="text-primary">Administrar Usuarios</h2>
            </div>

            <div className="card-body mb-2">
              <p>
                Administra tus usuarios (sólo Administradores puede acceder a esta
                sección)
              </p>
              <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
                Agregar Usuario
              </Link>
              <table className="table table-striped table-responsive">
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
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getAllUsers, deleteUser })(UserList);
