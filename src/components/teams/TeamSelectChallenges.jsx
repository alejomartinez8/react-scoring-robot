import React from "react";

const TeamSelectChallenges = ({ options = [], challenge, handleChange }) => {
  return (
    <div className="form-group row">
      <label className="col-md-4 col-form-group" htmlFor="challenge">
        Reto
      </label>
      <div className="col-md">
        <select
          name="challenge"
          id="challenge"
          className="form-control"
          value={challenge}
          onChange={handleChange}
          disabled={options.length > 0 ? false : true}
          required
        >
          <option></option>
          {options.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TeamSelectChallenges;
