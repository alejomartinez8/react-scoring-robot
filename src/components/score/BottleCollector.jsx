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
  bottle1: false,
  bottle2: false,
  bottle3: false,
  bottle4: false,
};

const BottleCollector = () => {
  const [formData, setFormData] = useState(initalState);
  const { team, bottle1, bottle2, bottle3, bottle4 } = formData;

  const [totalPoints, setTotalPoints] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
    let total = totalPoints;
    switch (e.target.name) {
      case "bottle1":
        e.target.checked ? (total += 100) : (total -= 100);
        break;
      case "bottle2":
        e.target.checked ? (total += 200) : (total -= 200);
        break;
      case "bottle3":
        e.target.checked ? (total += 300) : (total -= 300);
        break;

      case "bottle4":
        e.target.checked ? (total += 400) : (total -= 400);
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
          <h2 className="text-primary">Calificar Recolector Botellas</h2>
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

            <div className="form group table-responsive">
              <table className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th>Botellas</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center ">
                        <Input
                          type="checkBox"
                          name="bottle1"
                          checked={bottle1}
                          onChange={handleChange}
                          disabled={bottle2}
                        />
                        <label className="form-check-label" htmlFor="bottle1">
                          Botella #1 (100 pts)
                        </label>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <Input
                          type="checkBox"
                          name="bottle2"
                          checked={bottle2}
                          onChange={handleChange}
                          disabled={!bottle1 || bottle3}
                        />
                        <label className="form-check-label" htmlFor="bottle2">
                          Botella #2 (200 pts)
                        </label>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="d-flex align-items-center ">
                        <Input
                          type="checkBox"
                          name="bottle3"
                          checked={bottle3}
                          onChange={handleChange}
                          disabled={!bottle2 || bottle4}
                        />
                        <label className="form-check-label" htmlFor="bottle3">
                          Botella #3 (300 pts)
                        </label>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="d-flex align-items-center ">
                        <Input
                          type="checkBox"
                          name="bottle4"
                          checked={bottle4}
                          onChange={handleChange}
                          disabled={!bottle3}
                        />
                        <label className="form-check-label" htmlFor="bottle4">
                          Botella #4 (400 pts)
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

export default BottleCollector;
