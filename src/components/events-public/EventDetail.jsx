import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { eventActions } from "../../redux/actions";
import Spinner from "../layout/Spinner";
import ChallengeCard from "./ChallengeCard";

const EventDetail = ({ auth, event, loading, getEventByShortName, match }) => {
  useEffect(() => {
    getEventByShortName(match.params.shortName);
  }, [getEventByShortName, match.params.shortName]);

  const challenges = event.challenges;
  console.log(challenges);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="my-2">
            <Link to="." className="btn btn-primary mr-1">
              Atrás
            </Link>
            {auth.isAuth && auth.userAuth.role === "Admin" && (
              <Link
                to={`/admin/events/edit/${event._id}`}
                className="btn btn-outline-secondary"
              >
                Editar Evento
              </Link>
            )}
          </div>
          <h2 className="text-primary m-2">{event.name}</h2>
          <img className="card-img-top" src={event.imageURL} alt=""></img>
          <div className="my-4">
            <h2 className="text-primary">Retos</h2>
            {challenges !== undefined ? (
              <Fragment>
                {challenges.map((challenge) => (
                  <ChallengeCard challenge={challenge} auth={auth} />
                ))}
              </Fragment>
            ) : (
              <h4>No hay retos</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

EventDetail.propTypes = {
  event: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  event: state.event.event,
  loading: state.event.loading,
});

const actionsCreators = {
  getEventByShortName: eventActions.getEventByShortName,
};

export default connect(mapStateToProps, actionsCreators)(EventDetail);
