import React from "react";
import "./Tennis.css";

function Tennis() {
  return (
    <div className="scoreboard">
      <div className="player player-bottom">
        <div className="set-score point" style={{ left: "201px" }}>00</div>
        <div className="set-score" style={{ left: "318px" }}>0</div>
        <div className="set-score" style={{ left: "385px" }}>0</div>
        <div className="set-score" style={{ left: "452px" }}>0</div>
        <div className="dot"></div>
        <div className="player-name">PLAYER 1</div>
      </div>
      <div className="player player-top">
        <div className="set-score point" style={{ left: "201px" }}>00</div>
        <div className="set-score" style={{ left: "318px" }}>0</div>
        <div className="set-score" style={{ left: "385px" }}>0</div>
        <div className="set-score" style={{ left: "452px" }}>0</div>
        <div className="dot"></div>
        <div className="player-name">PLAYER 2</div>
      </div>

      <div className="sets">
        <div className="set " style={{ left: "109px" }}>SET 1</div>
        <div className="set" style={{ left: "176px" }}>SET 2</div>
        <div className="set" style={{ left: "243px" }}>SET 3</div>
        <div className="points point">POINTS</div>
      </div>
      <div className="timer">00:00</div>
    </div>
  );
}

export default Tennis;
