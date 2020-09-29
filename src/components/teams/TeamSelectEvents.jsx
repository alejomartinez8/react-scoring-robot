import React from "react";

const TeamSelectEvents = ({
  options = [],
  event,
  handleChange,
  disabled = false,
}) => {
  return (
    <div className="form-group row">
      <label className="col-md-4 col-form-group" htmlFor="event">
        Evento (*)
      </label>
      <div className="col-md">
        <select
          name="event"
          id="event"
          className="form-control"
          value={event}
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

export default TeamSelectEvents;
