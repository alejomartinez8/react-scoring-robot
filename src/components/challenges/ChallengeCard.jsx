import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

const ChallengeCard = ({ auth, challenge }) => {
  const match = useRouteMatch();
  return (
    <div className="card my-4">
      <div className="card-header">
        <h3 className="text-primary">
          <i className="fas fa-trophy"></i> {challenge.name}
        </h3>
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
              {challenge.categories !== [] &&
                challenge.categories.map((category, index) => (
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
            className="btn btn-dark m-1"
          >
            <i className="fas fa-edit"></i> Editar
          </Link>
        )}
        <Link
          to={`${match.url}/${challenge.slug}/results`}
          className="btn btn-primary m-1"
        >
          <i className="fas fa-list"></i> Resultados
        </Link>

        {challenge.playoffs && (
          <Link
            to={`${match.url}/${challenge.slug}/playoffs`}
            className="btn btn-primary m-1"
          >
            Playoffs
          </Link>
        )}

        {auth.isAuth &&
          (auth.userAuth.role === "Admin" || auth.userAuth.role === "Judge") && (
            <Link
              to={`${match.url}/${challenge.slug}/score`}
              className="btn btn-warning m-1"
            >
              <i className="fas fa-tasks"></i> Calificar
            </Link>
          )}
      </div>
    </div>
  );
};

export default ChallengeCard;
