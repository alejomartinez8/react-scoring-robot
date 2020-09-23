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
  penalty1: false,
  penalty2: false,
  pentalty3: false,
};

const FireFighting = () => {
  const [formData, setFormData] = useState(initalState);
  const { team, task1, task2, task3, penalty1, penalty2, penalty3 } = formData;

  const [totalPoints, setTotalPoints] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
    let total = totalPoints;
    switch (e.target.name) {
      case "task1":
        e.target.checked ? (total += 100) : (total -= 100);
        break;
      case "task2":
        e.target.checked ? (total += 200) : (total -= 200);
        break;
      case "task3":
        e.target.checked ? (total += 300) : (total -= 300);
        break;

      case "penalty1":
        e.target.checked ? (total -= 50) : (total += 50);
        break;
      case "penalty2":
        e.target.checked ? (total -= 100) : (total += 100);
        break;
      case "penalty3":
        e.target.checked ? (total -= 150) : (total += 150);
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
          <h2 className="text-primary">Calificar Reto de Fuego</h2>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label" htmlFor="team">
                Equipo #
              </label>
              <div className="col-sm-2">
                <select className="form-control" name="team" id="team" required>
                  <option value=""></option>
                </select>
              </div>
            </div>

            <div className="form-group table-responsive">
              <div className="col-sm-9 table-responsive">
                <table className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>Tareas</th>
                      <th>Penalidad</th>
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
                            disabled={task2 || penalty1}
                          />
                          <label className="form-check-label" htmlFor="task1">
                            Vela #1 (100 pts)
                          </label>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center ">
                          <Input
                            type="checkBox"
                            name="penalty1"
                            checked={penalty1}
                            onChange={handleChange}
                            disabled={!task1 || task2}
                          />
                          <label className="form-check-label" htmlFor="penalty1">
                            50%
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
                            disabled={!task1 || task3 || penalty2}
                          />
                          <label className="form-check-label" htmlFor="task2">
                            Vela #2 (200 pts)
                          </label>
                        </div>
                      </td>

                      <td>
                        <div className="d-flex align-items-center ">
                          <Input
                            type="checkBox"
                            name="penalty2"
                            checked={penalty2}
                            onChange={handleChange}
                            disabled={!task2 || task3}
                          />
                          <label className="form-check-label" htmlFor="penalty2">
                            50%
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
                            disabled={!task2 || penalty3}
                          />
                          <label className="form-check-label" htmlFor="task3">
                            Vela #3 (300 pts)
                          </label>
                        </div>
                      </td>

                      <td>
                        <div className="d-flex align-items-center ">
                          <Input
                            type="checkBox"
                            name="penalty3"
                            checked={penalty3}
                            onChange={handleChange}
                            disabled={!task3}
                          />
                          <label className="form-check-label" htmlFor="penalty3">
                            50%
                          </label>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-3 col-form-label" htmlFor="team">
                Total
              </label>
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

export default FireFighting;
