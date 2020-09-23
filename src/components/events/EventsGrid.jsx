import React, { Fragment, useEffect } from "react";
import EventCard from "./EventCard";
import { connect } from "react-redux";
import { eventActions } from "../../redux/actions";
import Spinner from "../layout/Spinner";

const EventGrid = ({ event: { events, loading }, getAllEvents }) => {
  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Eventos</h1>
          {events.length > 0 ? (
            events.map((event) => <EventCard key={event._id} event={event} />)
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
});

const actionCreators = {
  getAllEvents: eventActions.getAllEvents,
};

export default connect(mapStateToProps, actionCreators)(EventGrid);