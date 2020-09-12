import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { teamActions } from "../../../redux/actions";

const initialState = {
  coach: "",
  name: "",
  category: "",
  institution: "",
};

const TeamForm = ({ team: { team, loading }, addTeam, updateTeam }) => {
  const teamUpdate = Object.keys(team).length !== 0;

  useEffect(() => {
    if (!loading && teamUpdate) {
      const teamData = { ...initialState };
      for (const key in team) {
        if (key in teamData) {
          teamData[key] = team[key];
        }
      }
      setFormData(teamData);
    }
  }, [loading, team, teamUpdate]);

  const [formData, setFormData] = useState(initialState);
  const { coach, name, category, institution } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teamUpdate) {
      updateTeam(team.id, formData);
    } else {
      addTeam(formData);
      setFormData(initialState);
    }
  };

  return (
    <Fragment>
      <Link to="/admin/teams" className="btn btn-sm btn-primary mb-2">
        Atrás
      </Link>
      <div className="card shadow mb-2">
        <div className="card-header">
          <h2>{!teamUpdate ? "Agregar Reto" : "Editar Reto"}</h2>
        </div>
        <div className="card-body">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="form-group">
                <label htmlFor="coach">Entrenador</label>
                <input
                  type="text"
                  className="form-control"
                  id="coach"
                  name="coach"
                  value={coach}
                  onChange={handleChange}
                  required
                />
              </div>

              <label htmlFor="name">Nombre Equipo</label>
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
              <label htmlFor="category">Categoría</label>
              <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                value={category}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="institution">Institución</label>
              <input
                type="text"
                className="form-control"
                id="institution"
                name="institution"
                value={institution}
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
              <Link to="/admin/teams" className="btn btn-secondary m-1">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  team: state.team,
});

const actionCreators = {
  addTeam: teamActions.addTeam,
  updateTeam: teamActions.updateTeam,
};

export default connect(mapStateToProps, actionCreators)(TeamForm);
