import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { eventActions } from "../../redux/actions";
import Spinner from "../layout/Spinner";
import ChallengeCard from "../challenges/ChallengeCard";

const EventDetail = ({ auth, event, loading, getEventByShortName, match }) => {
  useEffect(() => {
    getEventByShortName(match.params.eventSlug);
  }, [getEventByShortName, match.params.eventSlug]);

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
          <h2 className="text-primary m-2">{event.name} - Retos</h2>

          {challenges !== undefined ? (
            <Fragment>
              {challenges.map((challenge) => (
                <ChallengeCard
                  key={challenge._id}
                  challenge={challenge}
                  auth={auth}
                />
              ))}
            </Fragment>
          ) : (
            <h4>No hay retos</h4>
          )}
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
