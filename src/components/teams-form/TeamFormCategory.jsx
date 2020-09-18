import React from "react";

const TeamFormCategory = ({ options = [], category, handleChange, disabled }) => {
  return (
    <div className="form-group row">
      <label className="col-md-4 col-form-group" htmlFor="category">
        Categoría (*)
      </label>
      <div className="col-md">
        <select
          type="text"
          className="form-control"
          id="category"
          name="category"
          value={category}
          onChange={handleChange}
          disabled={disabled}
        >
          <option></option>
          {options.map((categoryOption, index) => (
            <option key={index} value={categoryOption}>
              {categoryOption}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TeamFormCategory;
