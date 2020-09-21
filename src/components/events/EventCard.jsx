import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ event: { shortName, name, imageURL, description } }) => {
  return (
    <div className="card shadow my-4">
      <div className="card-header">
        <h2>{shortName}</h2>
      </div>

      <div className="card-body">
        <img className="card-img-top" src={imageURL} alt=""></img>
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Descripción: {description}</p>
      </div>
      <div className="card-footer">
        <Link to={`/events/${shortName}`} className="btn btn-primary">
          Ver Evento
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
