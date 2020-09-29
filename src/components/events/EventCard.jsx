import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ auth, event: { _id, slug, name, imageURL, description } }) => {
  return (
    <div className="card shadow my-4">
      <div className="card-header">
        <h2>{slug}</h2>
      </div>

      <div className="card-body">
        <img className="card-img-top" src={imageURL} alt=""></img>
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Descripción: {description}</p>
      </div>
      <div className="card-footer">
        {auth.isAuth && auth.userAuth.role === "Admin" && (
          <Link to={`/admin/events/edit/${_id}`} className="btn btn-dark m-1">
            Editar
          </Link>
        )}
        <Link to={`/events/${slug}`} className="btn btn-primary m-1">
          Ver Retos
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
