import React, { useState } from "react";

const initialState = {
  label: "",
  points: 0,
  penalty: 0,
};

const ChallengeTaskForm = ({
  index,
  task,
  textButton,
  addTask,
  updateTask,
  setEdit,
}) => {
  const [newTask, setNewTask] = useState(task ? task : initialState);
  const { label, points, penalty } = newTask;

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (label !== "" && !task) {
      addTask(newTask);
    } else {
      updateTask(index, newTask);
      setEdit(false);
    }

    setNewTask(initialState);
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          className="form-control"
          placeholder="Nombre Tarea"
          name="label"
          value={label}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          type="number"
          className="form-control"
          name="points"
          value={points}
          onChange={handleChange}
        />
      </td>

      <td>
        <input
          type="number"
          className="form-control"
          name="penalty"
          value={penalty}
          onChange={handleChange}
        />
      </td>
      <td>
        <button className="btn btn-sm btn-primary" onClick={handleSubmit}>
          {textButton}
        </button>
      </td>
    </tr>
  );
};

export default ChallengeTaskForm;
