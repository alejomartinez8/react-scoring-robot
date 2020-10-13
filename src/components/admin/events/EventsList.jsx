import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { eventActions } from "../../../redux/actions";
import { Spinner } from "react-bootstrap";
import ToggleButton from "../../layout/ToggleButton";

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

  const handleDeleteEvent = (id) => {
    deleteEvent(id);
  };

  const handleToggleActiveEvent = (id) => {
    toggleActiveEvent(id);
    getEvents();
  };

  const getStage = (stage) => {
    switch (stage) {
      case "registration":
        return "Registro Equipos";
      case "scoring":
        return "Calificando";
      case "finished":
        return "Finalizado";
      default:
        return "";
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Fragment>
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
                      <tr key={event._id}>
                        <td>{event.name}</td>
                        <td>{event.slug}</td>
                        <td>{event.year}</td>
                        <td>{getStage(event.stage)}</td>
                        <td>
                          <ToggleButton
                            toggle={event.active}
                            toggleId={event._id}
                            handleToggle={handleToggleActiveEvent}
                          />
                        </td>
                        <td style={{ whiteSpace: "nowrap" }}>
                          <Link
                            to={`${path}/edit/${event._id}`}
                            className="btn btn-sm btn-primary mr-1"
                          >
                            Editar
                          </Link>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDeleteEvent(event._id)}
                          >
                            <span>Eliminar</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Fragment>
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
