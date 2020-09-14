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

const optionChallenges = [];

/** Component */
const EventForm = ({
  event,
  eventLoading,
  challengeList,
  challengeLoading,
  addEvent,
  updateEvent,
  getAllChallenges,
}) => {
  // load event info if update
  const eventUpdate = Object.keys(event).length !== 0;
  useEffect(() => {
    if (!eventLoading && eventUpdate) {
      const loadEventData = { ...initialState };
      for (const key in event) {
        if (key in loadEventData) {
          loadEventData[key] = event[key];
        }
      }
      // load DataBase info to Hooks
      setEventData(loadEventData);
      setSelectedChallenge(loadEventData.challenges.map((elm) => elm._id));
    }
  }, [eventLoading, event, eventUpdate]);

  const [eventData, setEventData] = useState(initialState);
  const { name, shortName, year, imageURL, description } = eventData;

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  // load Challenges of API
  useEffect(() => {
    if (!challengeLoading) {
      getAllChallenges();
    }
  }, [getAllChallenges, challengeLoading]);

  // load options to Select Challenges
  useEffect(() => {
    if (!challengeLoading && optionChallenges.length === 0) {
      // load all options in Select
      challengeList.forEach((elm) => {
        optionChallenges.push({ value: elm._id, label: elm.name });
      });
    }
  }, [challengeLoading, challengeList]);

  const [selectedChallenge, setSelectedChallenge] = useState([]);

  // use with select-react
  const handleChallengeChange = (event) => {
    const selectedOptions = Array.isArray(event)
      ? event.map((elm) => elm.value)
      : [];
    setSelectedChallenge(selectedOptions);

    const valuesToAPI = challengeList.filter((elm) =>
      selectedOptions.includes(elm._id)
    );
    setEventData({ ...eventData, challenges: valuesToAPI });
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
    setEventData({ ...eventData, challenges: valuesToAPI });
  };*/

  // handleSubtmit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (eventUpdate) {
      updateEvent(event._id, eventData);
    } else {
      addEvent(eventData);
      setEventData(initialState);
      setSelectedChallenge([]);
    }
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
                    value={optionChallenges.filter((elm) =>
                      selectedChallenge.includes(elm.value)
                    )}
                    options={optionChallenges}
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
  event: state.event.event,
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
