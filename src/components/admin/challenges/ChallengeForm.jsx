import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { challengeActions } from "../../../redux/actions";
import Spinner from "../../layout/Spinner";

const initialState = {
  name: "",
  version: "",
  imageURL: "",
  description: "",
  available: "",
};

const ChallengeForm = ({
  challenge: { challenge, loading },
  addChallenge,
  updateChallenge,
}) => {
  const challengeUpdate = Object.keys(challenge).length !== 0;

  useEffect(() => {
    if (!loading && challengeUpdate) {
      const challengeData = { ...initialState };
      for (const key in challenge) {
        if (key in challengeData) {
          challengeData[key] = challenge[key];
        }
      }
      setFormData(challengeData);
    }
  }, [loading, challenge, challengeUpdate]);

  const [formData, setFormData] = useState(initialState);
  const { name, version, imageURL, description, available } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (challengeUpdate) {
      updateChallenge(challenge._id, formData);
    } else {
      addChallenge(formData);
      setFormData(initialState);
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/admin/challenges" className="btn btn-sm btn-primary">
            Atrás
          </Link>
          <div className="card shadow my-2">
            <div className="card-header">
              <h2 className="text-primary">
                {!challengeUpdate ? "Agregar Reto" : "Editar Reto"}
              </h2>
            </div>
            <div className="card-body">
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Nombre Reto</label>
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
                  <label htmlFor="version">Código Reto</label>
                  <input
                    type="text"
                    className="form-control"
                    id="version"
                    name="version"
                    value={version}
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
                    required
                  />
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
                  <Link to="/admin/challenges" className="btn btn-secondary m-1">
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
  challenge: state.challenge,
});

const actionCreators = {
  addChallenge: challengeActions.addChallenge,
  updateChallenge: challengeActions.updateChallenge,
};

export default connect(mapStateToProps, actionCreators)(ChallengeForm);
