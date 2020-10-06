import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ auth, event: { _id, slug, name, imageURL, description } }) => {
  return (
    <div className="card  my-4">
      <div className="card-header">
        <h2 className="text-primary">{name}</h2>
      </div>

      <div className="card-body">
        <img className="img-fluid" src={imageURL} alt=""></img>

        <h5 className="card-title">{name}</h5>
        <p className="card-text">Descripción: {description}</p>
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
  );
};

export default EventCard;
