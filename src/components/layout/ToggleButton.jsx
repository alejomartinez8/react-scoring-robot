import React from "react";

const ToggleButton = ({ toggle, toggleId, handleToggle }) => {
  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={toggle}
        onChange={() => handleToggle(toggleId)}
      />
      <span className="slider round"></span>
    </label>
  );
};

export default ToggleButton;
