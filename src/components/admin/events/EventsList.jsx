import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { eventActions } from "../../../redux/actions";
import Spinner from "../../layout/Spinner";

const EventsList = ({
  event: { events, loading },
  getAllEvents,
  deleteEvent,
  match,
}) => {
  const { path } = match;

  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  const handleDeleteEvent = (id) => {
    deleteEvent(id);
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/admin/" className="btn btn-sm btn-primary mb-2">
            Atrás
          </Link>
          <div className="card shadow mb-4">
            <div className="card-header">
              <h2 className="text-primary">Administrar Eventos</h2>
            </div>

            <div className="card-body">
              <p>
                Administra tus eventos (sólo Administradores pueden acceder a esta
                sección)
              </p>
              <Link className="btn btn-sm btn-success mb-2" to={`${path}/add`}>
                Agregar Evento
              </Link>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Nombre Evento</th>
                      <th>Nombre Corto</th>
                      <th>Año</th>
                      <th>Descripción</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {events &&
                      events.map((event) => (
                        <tr key={event.id}>
                          <td>{event.name}</td>
                          <td>{event.shortName}</td>
                          <td>{event.year}</td>
                          <td>{event.description}</td>
                          <td style={{ whiteSpace: "nowrap" }}>
                            <Link
                              to={`${path}/edit/${event.id}`}
                              className="btn btn-sm btn-primary mr-1"
                            >
                              Editar
                            </Link>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDeleteEvent(event.id)}
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
  getAllEvents: eventActions.getAllEvents,
  deleteEvent: eventActions.deleteEvent,
};

export default connect(mapStateToProps, actionCreators)(EventsList);
