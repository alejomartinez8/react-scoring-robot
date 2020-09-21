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
  candle1: false,
  candle2: false,
  candle3: false,
  penalty1: false,
  penalty2: false,
  pentalty3: false,
};

const FireFighting = () => {
  const [formData, setFormData] = useState(initalState);
  const { team, candle1, candle2, candle3, penalty1, penalty2, penalty3 } = formData;

  const [totalPoints, setTotalPoints] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
    let total = totalPoints;
    switch (e.target.name) {
      case "candle1":
        e.target.checked ? (total += 100) : (total -= 100);
        break;
      case "candle2":
        e.target.checked ? (total += 200) : (total -= 200);
        break;
      case "candle3":
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

            <div className="form-group row ">
              <label className="col-sm-3 col-form-label">Tareas</label>
              <div className="col-sm-9 table-responsive">
                <table className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>Velas</th>
                      <th>Penalidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center ">
                          <Input
                            type="checkBox"
                            name="candle1"
                            checked={candle1}
                            onChange={handleChange}
                            disabled={candle2 || penalty1}
                          />
                          <label className="form-check-label" htmlFor="candle1">
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
                            disabled={!candle1 || candle2}
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
                            name="candle2"
                            checked={candle2}
                            onChange={handleChange}
                            disabled={!candle1 || candle3 || penalty2}
                          />
                          <label className="form-check-label" htmlFor="candle2">
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
                            disabled={!candle2 || candle3}
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
                            name="candle3"
                            checked={candle3}
                            onChange={handleChange}
                            disabled={!candle2 || penalty3}
                          />
                          <label className="form-check-label" htmlFor="candle3">
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
                            disabled={!candle3}
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
