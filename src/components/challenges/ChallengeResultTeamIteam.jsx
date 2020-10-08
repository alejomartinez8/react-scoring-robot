import React, { useState } from "react";
import { Link } from "react-router-dom";

const ChallengeResultTeamIteam = ({ userAuth, index, team, event, challenge }) => {
  //** Handle Expander */
  const [expanded, setExpanded] = useState(false);
  const toggleExpander = (e) => {
    console.log(index);
    if (!expanded) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  };

  return [
    <tr key="tr-main" onClick={toggleExpander}>
      <td>{index + 1}</td>
      <td>{team.name}</td>
      <td>{team.user.institution}</td>
      <td>{team.user.city}</td>
      <td className="text-center">{team.topPoints}</td>
      <td className="text-center">{team.totalPoints}</td>
      <td>
        {team.turns.length} de {challenge.maxTurns}
      </td>
    </tr>,
    expanded && (
      <tr key="tr-expander">
        <td className="bg-light" colSpan={7}>
          <div className="container m-2 d-flex justify-content-center">
            <div className="card w-50">
              <div className="card-body">
                <h5 className="text-primary">Turnos Calificados {team.name}</h5>

                {team.turns.length > 0 &&
                  team.turns.map((turn, index) => (
                    <div key={turn._id} className="d-flex justify-content-center">
                      <span>
                        <strong>Turno {index + 1}:</strong> {turn.totalPoints} pts{" "}
                        {userAuth.role === "Admin" && (
                          <Link
                            to={`/${event.slug}/${challenge.slug}/score/${turn._id}`}
                          >
                            Editar
                          </Link>
                        )}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </td>
      </tr>
    ),
  ];
};

export default ChallengeResultTeamIteam;
