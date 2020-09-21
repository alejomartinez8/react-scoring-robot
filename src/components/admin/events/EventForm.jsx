import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { eventActions } from "../../../redux/actions";
import { challengeActions } from "../../../redux/actions";
import Spinner from "../../layout/Spinner";
import Select from "react-select";
import { CategoriesType } from "../../../helpers";

const initialState = {
  name: "",
  shortName: "",
  imageURL: "",
  year: "",
  description: "",
  categories: [],
  challenges: [],
};

/** Component */
const EventForm = ({
  eventState,
  eventLoading,
  challengeList,
  challengeLoading,
  addEvent,
  updateEvent,
  getAllChallenges,
}) => {
  // form data use state
  const [eventFormData, setEventFormData] = useState(initialState);
  const { name, shortName, year, imageURL, description } = eventFormData;

  // select use state
  const [challengeOptions, setChallengeOptions] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  // select Categories use State
  const categoryOptions = CategoriesType.map((elm, index) => ({
    value: index,
    label: elm,
  }));

  // load eventState if update operation
  const eventUpdate = Object.keys(eventState).length !== 0;
  useEffect(() => {
    if (!eventLoading && eventUpdate) {
      const loadEventData = { ...initialState };
      for (const key in eventState) {
        if (key in loadEventData) {
          loadEventData[key] = eventState[key];
        }
      }

      // load eventState to Hooks
      setEventFormData(loadEventData);

      // load selected Challenges to Select Component options
      setSelectedChallenge(loadEventData.challenges.map((elm) => elm._id));

      // load selected Categories to Select Component options
      const categories = loadEventData.categories;
      setSelectedCategory(
        categoryOptions
          .filter((option) => categories.includes(option.label))
          .map((elm) => elm.value)
      );
    }
    // eslint-disable-next-line
  }, [eventLoading, eventState, eventUpdate]);

  // handle changes in fields of event form
  const handleChange = (e) => {
    if (e.target.name === "shortName") {
      setEventFormData({ ...eventFormData, shortName: e.target.value.trim() });
    } else {
      setEventFormData({ ...eventFormData, [e.target.name]: e.target.value });
    }
  };

  // fetch Challenges from API
  useEffect(() => {
    getAllChallenges();
  }, [getAllChallenges]);

  // load challenges to Select Challenges options
  useEffect(() => {
    if (!challengeLoading && challengeOptions.length === 0) {
      setChallengeOptions(
        challengeList.map((elm) => ({
          value: elm._id,
          label: elm.name,
        }))
      );
    }
    // eslint-disable-next-line
  }, [challengeList]);

  // use with select-react
  const handleChallengeChange = (e) => {
    const selectedOptions = Array.isArray(e) ? e.map((elm) => elm.value) : [];
    setSelectedChallenge(selectedOptions);

    setEventFormData({
      ...eventFormData,
      challenges: challengeList
        .filter((elm) => selectedOptions.includes(elm._id))
        .map((elm) => ({ _id: elm._id })),
    });
  };

  const handleCategoryChange = (e) => {
    const selectedOptions = Array.isArray(e) ? e.map((option) => option.value) : [];
    setSelectedCategory(selectedOptions);

    setEventFormData({
      ...eventFormData,
      categories: categoryOptions
        .filter((option) => selectedOptions.includes(option.value))
        .map((elm) => elm.label),
    });
  };

  // handleSubtmit
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(JSON.stringify(eventFormData));

    if (eventUpdate) {
      updateEvent(eventState._id, eventFormData);
    } else {
      addEvent(eventFormData);
      setEventFormData(initialState);
      setSelectedChallenge([]);
      setSelectedCategory([]);
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
                  <label htmlFor="categories">Categorías</label>
                  <Select
                    isMulti
                    className="dropdown"
                    placeholder="Selecciona las categorías permitidas"
                    options={categoryOptions}
                    onChange={handleCategoryChange}
                    value={categoryOptions.filter((elm) =>
                      selectedCategory.includes(elm.value)
                    )}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="challenges">Retos</label>
                  <Select
                    isMulti
                    className="dropdown"
                    placeholder="Selecciona un reto"
                    options={challengeOptions}
                    onChange={handleChallengeChange}
                    value={challengeOptions.filter((elm) =>
                      selectedChallenge.includes(elm.value)
                    )}
                  />
                </div>

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
  eventState: state.event.event,
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
