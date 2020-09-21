import React from "react";
import { Link } from "react-router-dom";

const TeamCard = ({ auth, team }) => {
  return (
    <div className="col-lg-4 col-md-6 my-2">
      <div className="card shadow h-100 w-100 ">
        <div className="card-header d-flex flex-column">
          <h3 className="text-center flex-row">{team.name}</h3>
          <h4 className="text-center flex-row">{team.event.slug}</h4>
          <h4 className="text-center flex-row">{team.challenge.name}</h4>
          <span className="badge badge-pill badge-info p-2 ">{team.category}</span>
          <p className="text-center flex-row">
            {team.user.city} / {team.user.country}
          </p>
        </div>{" "}
        {team.imageURL && (
          <img className="card-img-top" src={team.imageURL} alt={team.name}></img>
        )}
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Entrenador: </strong>
              {team.user.firstName} {team.user.lastName}
            </li>
            {team.players.map((player, index) => (
              <li key={player._id} className="list-group-item">
                <strong>{`Nombre ${index + 1}:`}</strong> {player.name}
              </li>
            ))}
          </ul>
        </div>
        {(auth.userAuth.role === "Admin" || auth.userAuth.id === team.user.id) && (
          <div className="card-footer">
            <Link
              to={`/teams/edit/${team._id}`}
              className="btn btn-outline-primary btn-sm"
            >
              Modificar
            </Link>
            <button className="btn btn-outline-danger btn-sm mx-1">Eliminar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamCard;
