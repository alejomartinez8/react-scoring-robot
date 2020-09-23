import React, { Fragment, useState } from "react";
import styled from "styled-components";
import ButtonBack from "../layout/ButtonBack";

const Input = styled.input`
  width: 30px;
  height: 30px;
  margin: 5px;
`;

const initalState = {
  team: "",
  task1: false,
  task2: false,
  task3: false,
  task4: false,
  task5: false,
  task6: false,
  task7: false,
};

const LineFollowingJR = () => {
  const [formData, setFormData] = useState(initalState);
  const { team, task1, task2, task3, task4, task5, task6, task7 } = formData;

  const [totalPoints, setTotalPoints] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
    let total = totalPoints;
    switch (e.target.name) {
      case "task1":
        e.target.checked ? (total += 25) : (total -= 25);
        break;
      case "task2":
        e.target.checked ? (total += 25) : (total -= 25);
        break;
      case "task3":
        e.target.checked ? (total += 100) : (total -= 100);
        break;
      case "task4":
        e.target.checked ? (total += 100) : (total -= 100);
        break;
      case "task5":
        e.target.checked ? (total += 25) : (total -= 25);
        break;
      case "task6":
        e.target.checked ? (total += 25) : (total -= 25);
        break;
      case "task7":
        e.target.checked ? (total += 100) : (total -= 100);
        break;
      default:
        break;
    }
    setTotalPoints(total);
  };

  return (
    <Fragment>
      <div className="card shadow my-4">
        <div className="card-header">
          <h2 className="text-primary">Calificar Line Following JR</h2>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="team">Equipo #</label>
              <div className="col-sm-2">
                <select className="form-control" name="team" id="team" required>
                  <option value=""></option>
                </select>
              </div>
            </div>

            <div className="form-group table-responsive">
              <table className="table table-striped ">
                <thead className="thead-dark">
                  <tr>
                    <th>Tareas</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center ">
                        <Input
                          type="checkBox"
                          name="task1"
                          checked={task1}
                          onChange={handleChange}
                          disabled={task2}
                        />
                        <label className="form-check-label" htmlFor="task1">
                          Salir del INICIO (25 pts)
                        </label>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <Input
                          type="checkBox"
                          name="task2"
                          checked={task2}
                          onChange={handleChange}
                          disabled={!task1 || task3}
                        />
                        <label className="form-check-label" htmlFor="task2">
                          Superar 1a INTERSECCIÓN (25 pts)
                        </label>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="d-flex align-items-center ">
                        <Input
                          type="checkBox"
                          name="task3"
                          checked={task3}
                          onChange={handleChange}
                          disabled={!task2 || task4}
                        />
                        <label className="form-check-label" htmlFor="task3">
                          Detenerse frente al VASO (100 pts)
                        </label>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="d-flex align-items-center ">
                        <Input
                          type="checkBox"
                          name="task4"
                          checked={task4}
                          onChange={handleChange}
                          disabled={!task3 || task5}
                        />
                        <label className="form-check-label" htmlFor="task4">
                          Depositar 1a PELOTA (100 pts)
                        </label>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="d-flex align-items-center ">
                        <Input
                          type="checkBox"
                          name="task5"
                          checked={task5}
                          onChange={handleChange}
                          disabled={!task4 || task6}
                        />
                        <label className="form-check-label" htmlFor="task5">
                          Devolverse (25 pts)
                        </label>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="d-flex align-items-center ">
                        <Input
                          type="checkBox"
                          name="task6"
                          checked={task6}
                          onChange={handleChange}
                          disabled={!task5 || task7}
                        />
                        <label className="form-check-label" htmlFor="task6">
                          Superar 1a INTERSECCIÓN (25 pts)
                        </label>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="d-flex align-items-center ">
                        <Input
                          type="checkBox"
                          name="task7"
                          checked={task7}
                          onChange={handleChange}
                          disabled={!task6}
                        />
                        <label className="form-check-label" htmlFor="task1">
                          Regresar al INICIO (100 pts)
                        </label>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="form-group">
              <label htmlFor="team">Total</label>
              <div className="col-sm-9 display-4">{totalPoints} pts</div>
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary mx-1"
                // disabled={loading}
              >
                {/* {loading && (
                  <span className="spinner-border spinner-border-sm m-1"></span>
                )} */}
                Guardar
              </button>
              <ButtonBack className="btn btn-secondary m-1">Cancelar</ButtonBack>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default LineFollowingJR;
