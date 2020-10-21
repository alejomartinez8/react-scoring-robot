import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUsers, deleteUser } from "../../../redux/actions/user.actions";
import { Spinner } from "react-bootstrap";
import UserListItem from "./UserListItem";

const UserList = ({
  getUsers,
  user: { users },
  loadingUsers,
  deleteUser,
  match,
}) => {
  const { path } = match;

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleDeleteUser = (id) => {
    deleteUser(id);
  };

  return (
    <Fragment>
      {loadingUsers ? (
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
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <UserListItem
                        key={user._id}
                        user={user}
                        actionConfirm={handleDeleteUser}
                      />
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
  loadingUsers: state.user.loading,
});

export default connect(mapStateToProps, { getUsers, deleteUser })(UserList);
