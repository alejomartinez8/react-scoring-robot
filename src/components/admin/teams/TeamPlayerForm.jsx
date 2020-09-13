import React, { useState, Fragment } from "react";

const initialState = {
  name: "",
  legalId: "",
  gender: "",
  birthday: "",
};

const TeamPlayerForm = ({ player }) => {
  const [playerData, setPlayerData] = useState(initialState);
  const { name, legalId, gender, birthday } = playerData;

  const handleChange = (e) => {
    setPlayerData({ ...playerData, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <div className="form-group row">
        <label className="col-md-4 col-form-group" htmlFor="name">
          Nombre Completo:
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
        <label className="col-md-4 col-form-group" htmlFor="legalId">
          Identificación:
        </label>
        <div className="col-md">
          <input
            type="number"
            className="form-control"
            id="legalId"
            name="legalId"
            value={legalId}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group row">
        <label className="col-md-4 col-form-group" htmlFor="legalId">
          Fecha de Nacimiento:
        </label>
        <div className="col-md">
          <input
            type="date"
            className="form-control"
            id="birthday"
            name="birthday"
            value={birthday}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group row">
        <label className="col-md-4 col-form-group" htmlFor="gender">
          Género:
        </label>
        <div className="col-md">
          <select
            className="form-control"
            id="gender"
            name="gender"
            value={gender}
            onChange={handleChange}
          >
            <option value=""></option>
            <option value="female">Femenino</option>
            <option value="male">Masculino</option>
          </select>
        </div>
      </div>
    </Fragment>
  );
};

export default TeamPlayerForm;
