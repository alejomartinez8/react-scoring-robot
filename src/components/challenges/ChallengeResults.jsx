import React, { Fragment } from "react";
import { useRouteMatch } from "react-router-dom";

const ChallengeResults = () => {
  const match = useRouteMatch();
  console.log(match);
  return (
    <Fragment>
      <h2 className="text-primary">Resultados reto (Pendiente)</h2>
      <div className="table-responsive">
        <table className="table table-striped ">
          <thead className="thead-dark">
            <tr>
              <th>Puesto</th>
              <th>Equipo #</th>
              <th>Nombre Equipo</th>
              <th>Institución</th>
              <th>Ciudad</th>
              <th>Top Máx</th>
              <th>Acumulado</th>
              <th>Turnos</th>
            </tr>
          </thead>
        </table>
      </div>
    </Fragment>
  );
};

export default ChallengeResults;
