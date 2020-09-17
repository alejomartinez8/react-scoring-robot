import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteUser } from "../../redux/actions/user.actions";
import Spinner from "../layout/Spinner";
import ProfileCard from "./ProfileCard";
import TeamGridPage from "../teams/TeamGridPage";

const ProfilePage = ({ auth: { userAuth, loading }, match }) => {
  const { path } = match;
  const onDelete = () => {
    console.log("Delete User");
    deleteUser(userAuth.id);
  };

  return loading && userAuth === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <ProfileCard
        userAuth={userAuth}
        loading={loading}
        path={path}
        onDelete={onDelete}
      />
      <section className="my-4">
        <TeamGridPage user={userAuth} />
      </section>
    </Fragment>
  );
};

ProfilePage.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired,
};

const mapSateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapSateToProps, { deleteUser })(ProfilePage);