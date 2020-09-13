import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { eventActions } from "../../../redux/actions";
import Spinner from "../../layout/Spinner";

const initialState = {
  name: "",
  shortName: "",
  imageURL: "",
  year: "",
  description: "",
};

const EventForm = ({ event: { event, loading }, addEvent, updateEvent }) => {
  const eventUpdate = Object.keys(event).length !== 0;

  useEffect(() => {
    if (!loading && eventUpdate) {
      const eventData = { ...initialState };
      for (const key in event) {
        if (key in eventData) {
          eventData[key] = event[key];
        }
      }
      setFormData(eventData);
    }
  }, [loading, event, eventUpdate]);

  const [formData, setFormData] = useState(initialState);
  const { name, shortName, year, imageURL, description } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (eventUpdate) {
      updateEvent(event.id, formData);
    } else {
      addEvent(formData);
      setFormData(initialState);
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/admin/events" className="btn btn-sm btn-primary">
            Atrás
          </Link>
          <div className="card shadow my-2">
            <div className="card-header">
              <h2 className="text-primary">
                {!eventUpdate ? "Agregar Evento" : "Editar Evento"}
              </h2>
            </div>
            <div className="card-body">
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Nombre Evento</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="shortName">Nombre Corto(url)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="SRI20##"
                    id="shortName"
                    name="shortName"
                    value={shortName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="imageURL">URL Imagen</label>
                  <input
                    type="text"
                    className="form-control"
                    id="imageURL"
                    name="imageURL"
                    value={imageURL}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="year">Año</label>
                  <input
                    type="number"
                    className="form-control"
                    id="year"
                    name="year"
                    value={year}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Descripcion</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <button
                    type="submit"
                    className="btn btn-primary m-1"
                    disabled={loading}
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    Guardar
                  </button>
                  <Link to="/admin/events" className="btn btn-secondary m-1">
                    Cancel
                  </Link>
                </div>
              </form>
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
  addEvent: eventActions.addEvent,
  updateEvent: eventActions.updateEvent,
};

export default connect(mapStateToProps, actionCreators)(EventForm);
