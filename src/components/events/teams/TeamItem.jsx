import React from "react";
import { Link } from "react-router-dom";

const TeamItem = ({ team: { id, name, imageURL } }) => {
  return (
    <div className="col-4 ">
      <div className="card m-2 h-100">
        <div className="card-header">
          <h2>{name}</h2>
        </div>
        <div className="card-body">
          <img src={imageURL} alt=""></img>
        </div>
        <div className="card-footer">
          <Link to={`/teams/${id}`} className="btn btn-primary">
            Ver Equipo
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeamItem;
