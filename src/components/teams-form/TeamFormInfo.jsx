import React, { Fragment } from "react";

const TeamFormInfo = ({ name, institution, handleChange }) => {
  return (
    <Fragment>
      <div className="form-group row">
        <label className="col-md-4 col-form-group" htmlFor="name">
          Nombre Equipo (*)
        </label>
        <div className="col-md">
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
      </div>

      <div className="form-group row">
        <label className="col-md-4 col-form-group" htmlFor="institution">
          Institución Educativa (*)
        </label>
        <div className="col-md">
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
      </div>
    </Fragment>
  );
};

export default TeamFormInfo;
