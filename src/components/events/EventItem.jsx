import React from "react";
import { Link } from "react-router-dom";

const EventItem = ({ event: { id, name, imageURL } }) => {
  return (
    <div className="card m-2">
      <div className="card-header">
        <h2>{name}</h2>
      </div>
      <div className="card-body">
        <img src={imageURL} alt=""></img>
      </div>
      <div className="card-footer">
        <Link to={`/events/${id}`} className="btn btn-primary">
          Ver Evento
        </Link>
      </div>
    </div>
  );
};

export default EventItem;
