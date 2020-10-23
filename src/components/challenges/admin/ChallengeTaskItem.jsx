import React, { useState } from "react";
import ChallengeTaskForm from "./ChallengeTaskForm";

const ChallengeTaskItem = ({ order, task, updateTask, deleteTask }) => {
  const [edit, setEdit] = useState(false);

  const handleEdit = (e) => {
    e.preventDefault();
    setEdit(true);
  };

  return (
    <>
      {!edit ? (
        <tr>
          <td>{task.label}</td>
          <td>{task.points}</td>
          <td>{task.penalty}</td>
          <td>
            <div>
              <button
                className="btn btn-sm btn-warning m-1"
                onClick={(e) => handleEdit(e)}
              >
                <i className="fas fa-edit m-1"></i>
              </button>
              <button
                className="btn btn-sm btn-danger m-1"
                onClick={(e) => deleteTask(e, order)}
              >
                <i className="fas fa-trash-alt mx-1"></i>
              </button>
            </div>
          </td>
        </tr>
      ) : (
        <ChallengeTaskForm
          index={order}
          task={task}
          updateTask={updateTask}
          textButton="Guardar"
          setEdit={setEdit}
        />
      )}
    </>
  );
};

export default ChallengeTaskItem;
