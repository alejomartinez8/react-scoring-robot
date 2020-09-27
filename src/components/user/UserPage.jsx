import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteUser } from "../../redux/actions/user.actions";
import Spinner from "../layout/Spinner";
import UserCard from "./UserCard";
import TeamsGrid from "../teams/TeamsGrid";

const UserPage = ({ auth: { userAuth, loading }, match }) => {
  const { path } = match;
  const onDelete = () => {
    deleteUser(userAuth.id);
  };

  return loading && userAuth === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <UserCard
        userAuth={userAuth}
        loading={loading}
        path={path}
        onDelete={onDelete}
      />
      {userAuth.role === "User" && (
        <section className="my-4">
          <TeamsGrid user={userAuth} isUserUser={true} title={"Mis Equipos"} />
        </section>
      )}
    </Fragment>
  );
};

UserPage.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired,
};

const mapSateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapSateToProps, { deleteUser })(UserPage);
