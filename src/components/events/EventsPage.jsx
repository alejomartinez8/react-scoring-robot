import React, { Fragment, useEffect } from "react";
import EventCard from "./EventCard";
import { connect } from "react-redux";
import { eventActions } from "../../redux/actions";
import Spinner from "../layout/Spinner";

const EventsPage = ({ auth, event: { events, loading }, getAllEvents }) => {
  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">
            <i className="fas fa-calendar"></i> Eventos
          </h1>
          {events.length > 0 ? (
            events.map((event) => (
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
  getAllEvents: eventActions.getAllEvents,
};

export default connect(mapStateToProps, actionCreators)(EventsPage);
