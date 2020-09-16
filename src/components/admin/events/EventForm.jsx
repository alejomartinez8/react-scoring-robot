import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { eventActions } from "../../../redux/actions";
import { challengeActions } from "../../../redux/actions";
import Spinner from "../../layout/Spinner";
import Select from "react-select";

const initialState = {
  name: "",
  shortName: "",
  imageURL: "",
  year: "",
  description: "",
  challenges: [],
};

const callengeOptions = [];

/** Component */
const EventForm = ({
  eventToUpdate,
  eventLoading,
  challengeList,
  challengeLoading,
  addEvent,
  updateEvent,
  getAllChallenges,
}) => {
  const [eventFormData, setEventFormData] = useState(initialState);
  const { name, shortName, year, imageURL, description } = eventFormData;

  const [selectedChallenge, setSelectedChallenge] = useState([]);

  // load eventToUpdate if update operation
  const eventUpdate = Object.keys(eventToUpdate).length !== 0;
  useEffect(() => {
    if (!eventLoading && eventUpdate) {
      const loadEventData = { ...initialState };
      for (const key in eventToUpdate) {
        if (key in loadEventData) {
          loadEventData[key] = eventToUpdate[key];
        }
      }
      // load eventToUpdate to Hooks
      setEventFormData(loadEventData);
      setSelectedChallenge(loadEventData.challenges.map((elm) => elm._id));
    }
  }, [eventLoading, eventToUpdate, eventUpdate]);

  // handle changes in fields of event form
  const handleChange = (e) => {
    setEventFormData({ ...eventFormData, [e.target.name]: e.target.value });
  };

  // fetch Challenges from API
  useEffect(() => {
    if (!challengeLoading) {
      getAllChallenges();
    }
  }, [getAllChallenges, challengeLoading]);

  // load challenges to Select Challenges options
  useEffect(() => {
    if (!challengeLoading && callengeOptions.length === 0) {
      // load all options in Select
      challengeList.forEach((elm) => {
        callengeOptions.push({ value: elm._id, label: elm.name });
      });
    }
  }, [challengeLoading, challengeList]);

  // use with select-react
  const handleChallengeChange = (e) => {
    const selectedOptions = Array.isArray(e) ? e.map((elm) => elm.value) : [];
    setSelectedChallenge(selectedOptions);

    const valuesToAPI = challengeList.filter((elm) =>
      selectedOptions
        .includes(elm._id)
        .map((elm) => ({ name: elm.name, _id: elm._id }))
    );

    // reportes = datosComparacion.filter((elm) => elm.Cases > 1).map((elm) => { return { day: elm.Date, total: elm.Cases } })

    setEventFormData({ ...eventFormData, challenges: valuesToAPI });
  };

  // Use with normal select
  /*
  const onChange = (e) => {
    let options = e.target.options;
    let selectedOptions = [];
    if (options) {
      for (let x = 0; x < options.length; x++) {
        if (options[x].selected) {
          selectedOptions.push(options[x].value);
        }
      }
    }
    setSelectedChallenge(selectedOptions);

    const valuesToAPI = challengeList.filter((elm) =>
      selectedOptions.includes(elm._id)
    );
    setEventFormData({ ...eventFormData, challenges: valuesToAPI });
  };*/

  // handleSubtmit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (eventUpdate) {
      updateEvent(eventToUpdate._id, eventFormData);
    } else {
      addEvent(eventFormData);
      setEventFormData(initialState);
      setSelectedChallenge([]);
    }
    // history.goBack();
  };

  return (
    <Fragment>
      {eventLoading ? (
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
              {/* Form */}
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

                <div className="form-group">
                  <label htmlFor="challenges">Retos: </label>
                  <Select
                    isMulti
                    className="dropdown"
                    placeholder="Selecciona un reto"
                    value={callengeOptions.filter((elm) =>
                      selectedChallenge.includes(elm.value)
                    )}
                    options={callengeOptions}
                    onChange={handleChallengeChange}
                  />
                </div>

                {/* <div className="form-group">
                  <select
                    multiple
                    className="form-control"
                    name="challenges"
                    id="challenges"
                    value={selectedChallenge}
                    onChange={onChange}
                  >
                    {challengeList.map((elm) => (
                      <option key={elm._id} value={elm._id}>
                        {elm.name}
                      </option>
                    ))}
                  </select>
                </div> */}

                <div className="form-row">
                  <button
                    type="submit"
                    className="btn btn-primary m-1"
                    disabled={eventLoading}
                  >
                    {eventLoading && (
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
  eventToUpdate: state.event.event,
  eventLoading: state.event.loading,
  challengeList: state.challenge.challenges,
  challegenLoading: state.challenge.loading,
});

const actionCreators = {
  addEvent: eventActions.addEvent,
  updateEvent: eventActions.updateEvent,
  getAllChallenges: challengeActions.getAllChallenges,
};

export default connect(mapStateToProps, actionCreators)(EventForm);
