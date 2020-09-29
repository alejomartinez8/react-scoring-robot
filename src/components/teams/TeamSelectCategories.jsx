import React from "react";

const TeamSelectCategories = ({ options = [], category, handleChange }) => {
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
          disabled={options.length > 0 ? false : true}
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

export default TeamSelectCategories;
