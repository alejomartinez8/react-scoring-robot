import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUsers, deleteUser } from "../../../redux/actions/user.actions";
import { Spinner } from "react-bootstrap";

const UserList = ({ getUsers, user: { users, loading }, deleteUser, match }) => {
  const { path } = match;

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleDeleteUser = (id) => {
    deleteUser(id);
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Fragment>
          <div className="card  mb-4">
            <div className="card-header">
              <h2 className="text-primary">Administrar Usuarios</h2>
            </div>

            <div className="card-body mb-2">
              <Link to={`${path}/add`} className="btn btn-sm btn-primary mb-2">
                Agregar Usuario
              </Link>
              <div className="table-responsive">
                <table className="table table-striped ">
                  <thead className="thead-dark">
                    <tr>
                      <th>Nombre Completo</th>
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
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getUsers, deleteUser })(UserList);
