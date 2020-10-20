import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { eventActions } from "../../../redux/actions";
import { Spinner } from "react-bootstrap";

import EventListItem from "./EventListItem";

const EventsList = ({
  event: { events, loading },
  getEvents,
  deleteEvent,
  toggleActiveEvent,
  match,
}) => {
  const { path } = match;

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  const handleToggleActiveEvent = (id) => {
    toggleActiveEvent(id);
  };

  const handleDeleteEvent = (id) => {
    deleteEvent(id);
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <div className="card  mb-4">
          <div className="card-header">
            <h2 className="text-primary">Administrar Eventos</h2>
          </div>

          <div className="card-body">
            <Link className="btn btn-sm btn-primary mb-2" to={`${path}/add`}>
              Agregar Evento
            </Link>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th>Nombre Evento</th>
                    <th>Nombre Corto</th>
                    <th>Año</th>
                    <th>Etapa</th>
                    <th>Activo</th>
                    <th>Editar/Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <EventListItem
                      key={event._id}
                      event={event}
                      actionConfirm={handleDeleteEvent}
                      handleToggleActiveEvent={handleToggleActiveEvent}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  event: state.event,
});

const actionCreators = {
  getEvents: eventActions.getEvents,
  deleteEvent: eventActions.deleteEvent,
  toggleActiveEvent: eventActions.toggleActiveEvent,
};

export default connect(mapStateToProps, actionCreators)(EventsList);
