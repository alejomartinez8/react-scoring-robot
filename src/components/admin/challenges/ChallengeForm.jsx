import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { challengeActions } from "../../../redux/actions";
import { CategoriesType } from "../../../helpers";
import Spinner from "../../layout/Spinner";
import ButtonBack from "../../layout/ButtonBack";
import Select from "react-select";
import ChallengeTaskItem from "./ChallengeTaskItem";
import ChallengeTaskForm from "./ChallengeTaskForm";

const initialState = {
  name: "",
  slug: "",
  imageURL: "",
  description: "",
  maxTeams: 0,
  maxTurns: 0,
  topMaxTurns: 0,
  playoffs: false,
  categories: [],
  available: "",
  maxTime: 0,
  tasks: [],
  taskSecuence: true,
  bonusType: "",
};

const ChallengeForm = ({
  challenge: { challenge, loading },
  getChallengeById,
  addChallenge,
  updateChallenge,
  match,
}) => {
  useEffect(() => {
    if (match.params.id) {
      getChallengeById(match.params.id);
    }
  }, [getChallengeById, match.params.id]);

  useEffect(() => {
    if (!loading && match.params.id) {
      const challengeData = { ...initialState };
      for (const key in challenge) {
        if (key in challengeData) {
          challengeData[key] = challenge[key];
        }
      }
      // load to form
      setFormData(challengeData);

      // load selected Categories to Select Component options
      const categories = challengeData.categories;
      setSelectedCategory(
        categoryOptions
          .filter((option) => categories.includes(option.label))
          .map((elm) => elm.value)
      );
    }
    // eslint-disable-next-line
  }, [loading, challenge, match.params.id]);

  //form data use State
  const [formData, setFormData] = useState(initialState);
  const {
    name,
    slug,
    imageURL,
    description,
    maxTeams,
    maxTurns,
    topMaxTurns,
    tasks,
    taskSecuence,
    bonusType,
    maxTime,
    playoffs,
    available,
  } = formData;

  // selecet Categories use State
  const categoryOptions = CategoriesType.map((elm, index) => ({
    value: index,
    label: elm,
  }));
  const [selectedCategory, setSelectedCategory] = useState([]);

  // load to update
  const challengeUpdate = Object.keys(challenge).length !== 0;

  // handle input chages
  const handleChange = (e) => {
    if (e.target.name === "slug") {
      setFormData({ ...formData, slug: e.target.value.trim() });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleCategoryChange = (e) => {
    const selectedOptions = Array.isArray(e) ? e.map((option) => option.value) : [];
    setSelectedCategory(selectedOptions);

    setFormData({
      ...formData,
      categories: categoryOptions
        .filter((option) => selectedOptions.includes(option.value))
        .map((elm) => elm.label),
    });
  };

  // add tasks
  const addTask = (task) => {
    setFormData({ ...formData, tasks: [...tasks, task] });
  };

  const updateTask = (index, task) => {
    console.log(index, task);
    let newTasks = tasks;
    newTasks[index] = task;
    console.log(newTasks);
    setFormData({ ...formData, tasks: newTasks });
  };

  const deleteTask = (index) => {
    let newTasks = tasks;
    newTasks.splice(index, 1);
    setFormData({ ...formData, tasks: newTasks });
  };

  // handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (challengeUpdate) {
      updateChallenge(challenge._id, formData);
    } else {
      addChallenge(formData);
      setFormData(initialState);
      setSelectedCategory([]);
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <ButtonBack className="btn btn-secondary m-1">Atrás</ButtonBack>
          <div className="card shadow my-2">
            <div className="card-header">
              <h2 className="text-primary">
                {!challengeUpdate ? "Agregar Reto" : "Editar Reto"}
              </h2>
            </div>
            <div className="card-body">
              <h4>Información</h4>
              <form className="form" onSubmit={handleSubmit}>
                <span>(*) Obligatorios</span>
                <div className="form-group">
                  <label htmlFor="name">Nombre Reto (*)</label>
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
                  <label htmlFor="slug">Slug Reto (*)</label>
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
                  <label htmlFor="maxTeams">No. Equipos Máximo por Reto (*)</label>
                  <input
                    type="Number"
                    className="form-control"
                    id="maxTeams"
                    name="maxTeams"
                    value={maxTeams}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="maxTeams">No. Turnos Máximo por Equipo (*)</label>
                  <input
                    type="Number"
                    className="form-control"
                    id="maxTurns"
                    name="maxTurns"
                    value={maxTurns}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="maxTeams">
                    Suma de puntajes Top Máximo de Turnos (*)
                  </label>
                  <input
                    type="Number"
                    className="form-control"
                    id="topMaxTurns"
                    name="topMaxTurns"
                    value={topMaxTurns}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="categories">Categorías: </label>
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

                <hr />
                <h4>Tareas</h4>

                <div className="form-group">
                  <label htmlFor="maxTime">Tiempo Maxímo (segundos)</label>
                  <input
                    type="Number"
                    className="form-control col-sm-3"
                    id="maxTime"
                    name="maxTime"
                    value={maxTime}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group table-responsive">
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th>Tarea</th>
                        <th>Puntos</th>
                        <th>Penalidad</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks.map((task, index) => (
                        <ChallengeTaskItem
                          key={index}
                          task={task}
                          index={index}
                          deleteTask={deleteTask}
                          updateTask={updateTask}
                        />
                      ))}
                      <ChallengeTaskForm addTask={addTask} textButton="Añadir" />
                    </tbody>
                  </table>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkBox"
                    name="taskSecuence"
                    checked={taskSecuence}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        taskSecuence: e.target.checked,
                      })
                    }
                  />{" "}
                  <label htmlFor="taskSecuence">Tareas en secuencia</label>
                </div>

                <div className="form-group">
                  <label htmlFor="bonusType">Puntaje Bonus</label>
                  <select
                    className="form-control"
                    name="bonusType"
                    id="bonustype"
                    value={bonusType}
                    onChange={handleChange}
                  >
                    <option value="">Ninguno</option>
                    <option value="timer">Sumar tiempo restante Timer</option>
                    <option value="manual">Ingresar manualmente</option>
                  </select>
                </div>

                <hr />
                <div className="form-group">
                  <input
                    type="checkBox"
                    name="playoffs"
                    checked={playoffs}
                    onChange={(e) =>
                      setFormData({ ...formData, playoffs: e.target.checked })
                    }
                  />{" "}
                  <label htmlFor="playoffs">PlayOffs</label>
                </div>

                <div className="form-group">
                  <input
                    id="available"
                    name="available"
                    type="checkbox"
                    required
                    checked={available}
                    className="form-control-custom"
                    onChange={() =>
                      setFormData({
                        ...formData,
                        available: !formData.available,
                      })
                    }
                  />{" "}
                  <label htmlFor="available"> Habilitado </label>
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
                  <ButtonBack className="btn btn-secondary m-1">Cancelar</ButtonBack>
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
  challenge: state.challenge,
});

const actionCreators = {
  getChallengeById: challengeActions.getChallengeById,
  addChallenge: challengeActions.addChallenge,
  updateChallenge: challengeActions.updateChallenge,
};

export default connect(mapStateToProps, actionCreators)(ChallengeForm);
