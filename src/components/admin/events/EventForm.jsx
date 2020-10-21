import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { eventActions, challengeActions } from "../../../redux/actions";
import { Spinner } from "react-bootstrap";
import ButtonBack from "../../layout/ButtonBack";
import Select from "react-select";
import { CategoriesType } from "../../../helpers";

const initialState = {
  name: "",
  slug: "",
  imageURL: "",
  year: "",
  description: "",
  categories: [],
  challenges: [],
  stage: "registration",
  maxPlayersTeam: 1,
  minPlayersTeam: 1,
};

/** Component */
const EventForm = ({
  eventState,
  eventLoading,
  getEventById,
  challengeList,
  challengeLoading,
  addEvent,
  updateEvent,
  getChallenges,
  match,
}) => {
  // load event
  useEffect(() => {
    if (match.params.id) {
      getEventById(match.params.id);
    }
  }, [getEventById, match.params.id]);

  // load eventState if update operation
  const eventUpdate = Object.keys(eventState).length !== 0;
  useEffect(() => {
    if (!eventLoading && match.params.id) {
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
  }, [eventLoading, eventState, match.params.id]);

  // form data use state
  const [eventFormData, setEventFormData] = useState(initialState);
  const {
    name,
    slug,
    year,
    imageURL,
    description,
    stage,
    maxPlayersTeam,
    minPlayersTeam,
  } = eventFormData;

  // select use state
  const [challengeOptions, setChallengeOptions] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  // select Categories use State
  const categoryOptions = CategoriesType.map((elm, index) => ({
    value: index,
    label: elm,
  }));

  // handle changes in fields of event form
  const handleChange = (e) => {
    switch (e.target.name) {
      case "slug":
        setEventFormData({ ...eventFormData, slug: e.target.value.trim() });
        break;
      case "minPlayersTeam":
        if (e.target.value > maxPlayersTeam) {
          alert("El valor mínimo no debe superar el valor máximo");
          setEventFormData({ ...eventFormData, minPlayersTeam: maxPlayersTeam });
        } else {
          setEventFormData({ ...eventFormData, [e.target.name]: e.target.value });
        }
        break;
      default:
        setEventFormData({ ...eventFormData, [e.target.name]: e.target.value });
        break;
    }
  };

  // fetch Challenges from API
  useEffect(() => {
    getChallenges();
  }, [getChallenges]);

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
        <Spinner animation="border" variant="primary" />
      ) : (
        <Fragment>
          <ButtonBack className="btn btn-primary mr-1 my-2">Atrás</ButtonBack>
          <div className="card  my-2">
            <div className="card-header">
              <h2 className="text-primary">
                {!eventUpdate ? "Agregar Evento" : "Editar Evento"}
              </h2>
            </div>
            <div className="card-body">
              {/* Form */}
              <form className="form">
                <div className="form-group">
                  <label htmlFor="name">Nombre Evento*</label>
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
                  <label htmlFor="slug">Nombre Corto(url)*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="slug"
                    name="slug"
                    value={slug}
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
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="stage">Etapa</label>
                  <select
                    className="form-control"
                    name="stage"
                    id="stage"
                    value={stage}
                    onChange={handleChange}
                  >
                    <option value="registration">Registro Equipos</option>
                    <option value="scoring">Calificando</option>
                    <option value="finished">Terminado</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="maxPlayersTeam">
                      Máximo de participantes por equipo
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="maxPlayersTeam"
                      name="maxPlayersTeam"
                      value={maxPlayersTeam}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <label htmlFor="minPlayersTeam">
                      Mínimo de participantes por equipo
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="minPlayersTeam"
                      name="minPlayersTeam"
                      value={minPlayersTeam}
                      onChange={handleChange}
                      required
                    />
                  </div>
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
                    className="btn btn-primary mr-2 mb-2"
                    disabled={eventLoading}
                    onClick={handleSubmit}
                  >
                    {eventLoading && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    Guardar
                  </button>
                  <ButtonBack className="btn btn-outline-primary mr-2 mb-2">
                    Cancelar
                  </ButtonBack>
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
  getEventById: eventActions.getEventById,
  addEvent: eventActions.addEvent,
  updateEvent: eventActions.updateEvent,
  getChallenges: challengeActions.getChallenges,
};

export default connect(mapStateToProps, actionCreators)(EventForm);
