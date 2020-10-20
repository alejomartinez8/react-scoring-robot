import React, { useState, Fragment, useEffect } from "react";
import moment from "moment";

const initialState = {
  name: "",
  legalId: "",
  gender: "",
  birthday: "",
};

const TeamInputPlayers = ({ addPlayer, index, player, required = false }) => {
  console.log(player);
  const [playerData, setPlayerData] = useState(
    player !== undefined ? player : initialState
  );
  const { name, legalId, gender, birthday } = playerData;

  useEffect(() => {
    // Save date in db is different format, but moment delete one day so it's need add 1 day
    setPlayerData({
      ...playerData,
      birthday: moment(birthday).add(1, "day").format("YYYY-MM-DD"),
    });
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setPlayerData({ ...playerData, [e.target.name]: e.target.value });
    addPlayer({ ...playerData, [e.target.name]: e.target.value }, index);
  };

  return (
    <Fragment>
      <div className="form-group row">
        <label className="col-md-4 col-form-group" htmlFor="name">
          Nombre Completo {required && "*"}
        </label>
        <div className="col-md">
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            required={required}
          />
        </div>
      </div>

      <div className="form-group row">
        <label className="col-md-4 col-form-group" htmlFor="legalId">
          Fecha de Nacimiento: {required && "*"}
        </label>
        <div className="col-md">
          <input
            type="date"
            className="form-control"
            id="birthday"
            name="birthday"
            value={birthday}
            onChange={handleChange}
            required={required}
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

export default TeamInputPlayers;
