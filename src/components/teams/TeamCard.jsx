import React from "react";
import { Link } from "react-router-dom";

const TeamCard = ({ auth, team }) => {
  console.log({ team });
  console.log(auth);
  return (
    <div className="col-lg-4 col-md-6 my-2">
      <div className="card shadow h-100 w-100 ">
        <div className="card-header d-flex flex-column">
          <h2 className="text-center flex-row">{team.name}</h2>
          <h3 className="text-center flex-row">{team.event.shortName}</h3>
          <h3 className="text-center flex-row">{team.challenge.name}</h3>
          <span className="badge badge-pill badge-info p-2 ">{team.category}</span>
        </div>
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
            <Link to={`/teams/edit/${team._id}`} className="btn btn-primary">
              Modificar
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamCard;
