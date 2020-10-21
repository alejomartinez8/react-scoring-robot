import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({
  auth,
  event: { _id, slug, name, imageURL, description, year, stage, challenges },
}) => {
  const getStage = (stage) => {
    switch (stage) {
      case "registration":
        return "Registro Equipos";
      case "scoring":
        return "Calificando";
      case "finished":
        return "Finalizado";
      default:
        return "";
    }
  };

  return (
    <>
      <div className="card my-4">
        <div className="card-header">
          <h3 className="text-primary">{name}</h3>
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-sm-4">
              <img className="img-thumbnail" src={imageURL} alt={name}></img>
            </div>
            <div className="col-sm">
              <p className="card-text">
                <strong>Descripción: </strong>
                {description}
              </p>
              <p className="card-text">
                <strong>Año: </strong>
                {year}
              </p>
              <p className="card-text">
                <strong>Retos: </strong>
                {challenges.length > 0 &&
                  challenges.map((challenge) => (
                    <span className="badge badge-primary m-1" key={challenge._id}>
                      {challenge.name}
                    </span>
                  ))}
              </p>
              <p className="card-text">
                <strong>Etapa: </strong>
                {getStage(stage)}
              </p>
            </div>
          </div>
        </div>
        <div className="card-footer">
          {auth.isAuth && auth.userAuth.role === "Admin" && (
            <Link to={`/admin/events/edit/${_id}`} className="btn btn-dark m-1">
              <i className="fas fa-edit"></i> Editar
            </Link>
          )}
          <Link to={`/events/${slug}`} className="btn btn-primary m-1">
            <i className="fas fa-trophy"></i> Ver Retos
          </Link>
        </div>
      </div>
    </>
  );
};

export default EventCard;
