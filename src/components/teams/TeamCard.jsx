import React from "react";
import { Link } from "react-router-dom";

const TeamCard = ({ auth, team }) => {
  console.log(auth);
  return (
    <div className="col-lg-4 col-md-6 my-2">
      <div className="card  h-100 w-100 ">
        <div className="card-header d-flex flex-column">
          <h3 className="text-center flex-row">{team.name}</h3>
          <h4 className="text-center flex-row">{team.event.slug}</h4>
          <h4 className="text-center flex-row">Reto: {team.challenge.name}</h4>
          <h4 className="text-center flex-row">Categoría: {team.category}</h4>
          <p className="text-center flex-row">
            {team.user.city} / {team.user.country}
          </p>
          <span
            className={`badge badge-pill ${
              team.registered ? "badge-success" : "badge-warning"
            } p-2`}
          >
            {team.registered ? "Inscrito" : "Pre-inscrito"}
          </span>
        </div>
        {team.imageURL && (
          <img className="card-img-top" src={team.imageURL} alt={team.name}></img>
        )}
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Entrenador: </strong>
              {team.user.fullName}
            </li>
            {team.players.map((player, index) => (
              <li key={player._id} className="list-group-item">
                <strong>{`Nombre ${index + 1}:`}</strong> {player.name}
              </li>
            ))}
          </ul>
        </div>

        {auth._id === team.user._id && (
          <div className="card-footer">
            <Link
              to={`/user/teams/edit/${team._id}`}
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
