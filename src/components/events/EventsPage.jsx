import React, { Fragment, useEffect } from "react";
import EventCard from "./EventCard";
import { connect } from "react-redux";
import { eventActions } from "../../redux/actions";
import { Spinner } from "react-bootstrap";

const EventsPage = ({ auth, event: { events, loading }, getEvents }) => {
  useEffect(() => {
    getEvents();
  }, [getEvents]);

  return (
    <Fragment>
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Fragment>
          <h2 className="large text-primary">
            <i className="fas fa-calendar"></i> Eventos
          </h2>
          {events.length > 0 && events.filter((event) => event.active).length > 0 ? (
            events
              .filter((event) => event.active)
              .sort((a, b) => b.year - a.year)
              .map((event) => (
                <EventCard key={event._id} event={event} auth={auth} />
              ))
          ) : (
            <h4>Todavía no hay eventos</h4>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  event: state.event,
  auth: state.auth,
});

const actionCreators = {
  getEvents: eventActions.getEvents,
};

export default connect(mapStateToProps, actionCreators)(EventsPage);
