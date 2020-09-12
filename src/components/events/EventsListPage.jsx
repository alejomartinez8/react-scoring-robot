import React, { Fragment, useEffect } from "react";
import EventItem from "./EventItem";
import { connect } from "react-redux";
import { eventActions } from "../../redux/actions";

const EventsListPage = ({ event: { events }, getAllEvents }) => {
  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  return (
    <Fragment>
      <h1 className="large text-primary">Eventos</h1>

      <div className="row">
        {events.length > 0 ? (
          events.map((event) => <EventItem key={event.id} event={event} />)
        ) : (
          <h4>Todavía no hay eventos</h4>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  event: state.event,
});

const actionCreators = {
  getAllEvents: eventActions.getAllEvents,
};

export default connect(mapStateToProps, actionCreators)(EventsListPage);
