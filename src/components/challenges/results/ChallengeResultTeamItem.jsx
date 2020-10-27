import React, { Fragment, useState } from "react";
import ChallengeResultTurnItem from "./ChallengeResultTurnItem";
import ModalEditScoringTurn from "./ModalEditScoringTurn";

const ChallengeResultTeamItem = ({
  userAuth,
  index,
  team,
  challenge,
  handleDeleteScore,
  handleUpdateScore,
}) => {
  //** Handle Expander */
  const [expanded, setExpanded] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [turn, setTurn] = useState({
    _id: "",
    tasks: [],
    penalites: [],
    bonusPoint: 0,
  });

  const toggleExpander = (e) => {
    setExpanded(!expanded);
  };

  const handleShowEdit = (id) => {
    const turn = team.turns.find((elm) => elm._id === id);
    console.log(turn);
    setTurn({ ...turn, teamId: team._id });
    setShowEdit(true);
  };

  const setColor = (index) => {
    // console.log(index);
    if (index === 1) {
      return "#C9B037";
    } else if (index === 2) {
      return "#B4B4B4";
    } else if (index === 3) {
      return "#AD8A56";
    }
  };

  return (
    <Fragment key={team._id}>
      <tr
        key={`tr-${team._id}`}
        onClick={toggleExpander}
        className="tr-results"
        style={{ backgroundColor: setColor(index + 1) }}
      >
        <td>
          <i
            className={
              expanded
                ? "fas fa-angle-up text-primary"
                : "fas fa-angle-down text-primary"
            }
          ></i>
        </td>
        <td>{index + 1}</td>
        <td>{"name" in team ? team.name : ""}</td>
        <td>{"institution" in team ? team.institution : ""}</td>
        <td>{"city" in team ? team.city : ""}</td>
        <td className="text-center">{"topPoints" in team && team.topPoints}</td>
        <td className="text-center">{"totalPoints" in team && team.totalPoints}</td>
        <td>
          {"turns" in team && team.turns.length} de{" "}
          {"maxTurns" in challenge && challenge.maxTurns}
        </td>
      </tr>
      <Fragment>
        {expanded && (
          <tr key={`expanded-${team._id}`}>
            <td className="bg-light" colSpan={8}>
              <div className="container m-2 d-flex justify-content-md-center">
                <div className="card w-75">
                  <div className="card-body">
                    <h5 className="text-primary">Turnos Calificados {team.name}</h5>

                    {"turns" in team && team.turns.length > 0 ? (
                      team.turns.map((turn, index) => (
                        <ChallengeResultTurnItem
                          team={team}
                          turn={turn}
                          key={turn._id}
                          index={index}
                          userAuth={userAuth}
                          handleShowEdit={handleShowEdit}
                          actionConfirm={handleDeleteScore}
                        />
                      ))
                    ) : (
                      <p>No hay turnos registrados</p>
                    )}
                  </div>
                </div>
              </div>
            </td>
          </tr>
        )}
      </Fragment>
      <ModalEditScoringTurn
        key={`modal-edit-${team._id}`}
        showEdit={showEdit}
        setShowEdit={setShowEdit}
        turn={turn}
        handleUpdateScore={handleUpdateScore}
      />
    </Fragment>
  );
};

export default ChallengeResultTeamItem;
