import React from "react";
import { Link } from "react-router-dom";

const ChallengeCard = ({ auth, challenge }) => {
  return (
    <div className="card shadow my-4" key={challenge._id}>
      <div className="card-header">
        <h3 className="text-primary">{challenge.name}</h3>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-sm-3">
            <img
              className="img-thumbnail"
              src={challenge.imageURL}
              alt={challenge.name}
            />
          </div>

          <div className="col">
            <p className="text-secondary">{challenge.description}</p>
            <p>
              Categorías:{" "}
              {challenge.categories.map((category, index) => (
                <span key={index} className="badge badge-pill badge-info mx-1">
                  {category}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
      <div className="card-footer">
        {auth.isAuth && auth.userAuth.role === "Admin" && (
          <Link
            to={`/admin/challenges/edit/${challenge._id}`}
            className="btn btn-outline-dark mr-2"
          >
            Editar
          </Link>
        )}
        <Link to="" className="btn btn-outline-primary  mr-2">
          Resultados
        </Link>
        <Link to="" className="btn btn-outline-success mr-2">
          Playoffs
        </Link>
        {auth.isAuth &&
          (auth.userAuth.role === "Admin" || auth.userAuth.role === "Judge") && (
            <Link to={``} className="btn btn-outline-warning mr-2">
              Calificar
            </Link>
          )}
      </div>
    </div>
  );
};

export default ChallengeCard;
