import React from "react";
import "./Tennis.css";

function Tennis({gameState : incomingGameState}) {
  const gameState = incomingGameState || {};


  if  (gameState?.Home?.Points === 17) {
    gameState.Home.Points = "A";
    gameState.Guest.Points = "-";
  } else if (gameState?.Guest?.Points === 17) {
    gameState.Guest.Points = "A";
    gameState.Home.Points = "-";
  }
  return (
    <div className="scoreboard">
      <div className="player player-bottom">
      <div className="set-score" style={{ left: "150px" }}>{gameState?.Guest?.GameInSet}</div>
        <div className="set-score point" style={{ left: "201px" }}>{gameState?.Home?.Points}</div>
        <div className="set-score" style={{ left: "318px" }}>{gameState?.Home?.PointsInSet[0]}</div>
        <div className="set-score" style={{ left: "385px" }}>{gameState?.Home?.PointsInSet[1]}</div>
        <div className="set-score" style={{ left: "452px" }}>{gameState?.Home?.PointsInSet[2]}</div>
        <div className="dot"></div>
        <div className="player-name">{gameState?.Home?.TeamName}</div>
      </div>
      <div className="player player-top">
      <div className="set-score" style={{ left: "150px" }}>{gameState?.Guest?.GameInSet}</div>
        <div className="set-score point" style={{ left: "201px" }}>{gameState?.Guest?.Points}</div>
        <div className="set-score" style={{ left: "318px" }}>{gameState?.Guest?.PointsInSet[0]}</div>
        <div className="set-score" style={{ left: "385px" }}>{gameState?.Guest?.PointsInSet[1]}</div>
        <div className="set-score" style={{ left: "452px" }}>{gameState?.Guest?.PointsInSet[2]}</div>
        <div className="dot"></div>
        <div className="player-name">{gameState?.Guest?.TeamName}</div>
      </div>

      <div className="sets">
        <div className="set " style={{ left: "109px" }}>SET 1</div>
        <div className="set" style={{ left: "176px" }}>SET 2</div>
        <div className="set" style={{ left: "243px" }}>SET 3</div>
        <div className="points point">POINTS</div>
      </div>
      <div className="timer">{gameState?.Timer?.Value}</div>
    </div>
  );
}

export default Tennis;
