import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { eventActions } from "../../redux/actions";
import Spinner from "../layout/Spinner";

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
                  <div className="card shadow my-4" key={challenge._id}>
                    <div className="card-header">
                      <h3 className="text-primary">{challenge.name}</h3>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-3">
                          <img
                            className="img-thumbnail"
                            src={challenge.imageURL}
                            alt={challenge.name}
                          />
                        </div>

                        <div className="col">
                          <p className="text-secondary">{challenge.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      {auth.isAuth && auth.userAuth.role === "Admin" && (
                        <Link
                          to={`/admin/challenges/edit/${challenge._id}`}
                          className="btn btn-outline-dark mr-2"
                        >
                          Editar
                        </Link>
                      )}
                      <Link className="btn btn-outline-primary  mr-2">
                        Resultados
                      </Link>
                      <Link className="btn btn-outline-success mr-2">Playoffs</Link>
                      {auth.isAuth &&
                        (auth.userAuth.role === "Admin" ||
                          auth.userAuth.role === "Judge") && (
                          <Link to={``} className="btn btn-outline-warning mr-2">
                            Calificar
                          </Link>
                        )}
                    </div>
                  </div>
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
