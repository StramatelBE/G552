import React from "react";
import "./Volleyball.css";

function Volleyball({ gameState: gameState }) {
  return (
    <div className="container">
      <div className="home-container">
        <div className="home-text">{gameState?.Home?.TeamName || "HOME"}</div>
        <div className="home-number">{gameState?.Home?.Points || "0"} </div>
        <div className="side-numbers">
          <div className="side-number" style={{ top: 0 }}>00</div>
          <div className="side-number" style={{ top: 64 }}>00</div>
          <div className="side-number" style={{ top: 128 }}>00</div>
          <div className="side-number" style={{ top: 192 }}>00</div>
        </div>
      </div>
      <div className="guest-container">
        <div className="guest-text">{gameState?.Guest?.TeamName || "GUEST"}</div>
        <div className="guest-number">{gameState?.Guest?.Points || "0"}</div>
        <div className="side-numbers" style={{ left: 214 }}>
          <div className="side-number" style={{ top: 0 }}>00</div>
          <div className="side-number" style={{ top: 64 }}>00</div>
          <div className="side-number" style={{ top: 128 }}>00</div>
          <div className="side-number" style={{ top: 192 }}>00</div>
        </div>
      </div>
      <div className="green-number">{gameState?.Period || "0"}</div>
      <div className="time">{gameState?.Timer?.Value || "00:00"}</div>
      <img className="image" src="LOGO_Stramatel.gif" />
    </div>
  )
}

export default Volleyball;
