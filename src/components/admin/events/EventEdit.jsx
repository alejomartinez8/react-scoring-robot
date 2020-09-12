import React, { useEffect } from "react";
import { connect } from "react-redux";
import { eventActions } from "../../../redux/actions";
import EventForm from "./EventForm";

const EventEdit = ({ event: { event }, getEventById, match }) => {
  useEffect(() => {
    getEventById(match.params.id);
  }, [getEventById, match.params.id]);

  return <EventForm event={event} />;
};

const mapStateToProps = (state) => ({
  event: state.event,
});

const actionCreators = {
  getEventById: eventActions.getEventById,
};

export default connect(mapStateToProps, actionCreators)(EventEdit);
