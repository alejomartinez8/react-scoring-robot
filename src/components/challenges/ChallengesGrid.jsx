import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { eventActions } from "../../redux/actions";
import { Spinner } from "react-bootstrap";
import ButtonBack from "../layout/ButtonBack";
import ChallengeCard from "./ChallengeCard";

const ChallengesGrid = ({ auth, event, loading, getEventBySlug, match }) => {
  useEffect(() => {
    getEventBySlug(match.params.eventSlug);
  }, [getEventBySlug, match.params.eventSlug]);

  const challenges = event.challenges;
  console.log(challenges);

  return (
    <Fragment>
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Fragment>
          <div className="my-2">
            <ButtonBack className="btn btn-primary mr-1 my-2">Atrás</ButtonBack>
            {auth.isAuth && auth.userAuth.role === "Admin" && (
              <Link
                to={`/admin/events/edit/${event._id}`}
                className="btn btn-outline-primary"
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

ChallengesGrid.propTypes = {
  event: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  event: state.event.event,
  loading: state.event.loading,
});

const actionsCreators = {
  getEventBySlug: eventActions.getEventBySlug,
};

export default connect(mapStateToProps, actionsCreators)(ChallengesGrid);
