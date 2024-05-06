import React, { useEffect, useState } from "react";
import "./Volleyball.css";
import "../globalSport.css";

function Volleyball({ gameState: incomingGameState }) {

  const [homeScore, setHomeScore] = useState(incomingGameState?.Home?.TotalPoints || 0);
  const [guestScore, setGuestScore] = useState(incomingGameState?.Guest?.TotalPoints || 0);

  const [homeFontSize, setHomeFontSize] = useState('50px');
  const [guestFontSize, setGuestFontSize] = useState('50px');

  const [homeScoreQueue, setHomeScoreQueue] = useState([]);
  const [guestScoreQueue, setGuestScoreQueue] = useState([]);

  const [prevHomeScore, setPrevHomeScore] = useState(incomingGameState?.Home?.TotalPoints || 0);
  const [prevGuestScore, setPrevGuestScore] = useState(incomingGameState?.Guest?.TotalPoints || 0);

  const [homeScoreAnimating, setHomeScoreAnimating] = useState(false);
  const [guestScoreAnimating, setGuestScoreAnimating] = useState(false);

  const gameState = incomingGameState || {};
  const showHomeTimeout = gameState?.Home?.Timeout?.Time !== "0:00";
  const showGuestTimeout = gameState?.Guest?.Timeout?.Time !== "0:00";


  useEffect(() => {
    if (gameState?.Home?.TotalPoints !== homeScoreQueue[homeScoreQueue.length - 1] && homeScoreQueue) {
      setHomeScoreQueue(prev => [...prev, gameState?.Home?.TotalPoints]);
    }
    if (gameState?.Guest?.TotalPoints !== guestScoreQueue[guestScoreQueue.length - 1] && guestScoreQueue) {
      setGuestScoreQueue(prev => [...prev, gameState?.Guest?.TotalPoints]);
    }
  }, [incomingGameState]);

  useEffect(() => {
    if (homeScoreQueue.length > 1 && !homeScoreAnimating) {
      const newHomeScore = homeScoreQueue[1];
      setHomeScoreAnimating(true);
      setHomeScore(newHomeScore)
      setTimeout(() => {
        setPrevHomeScore(newHomeScore);
        setHomeScoreAnimating(false);

        setHomeScoreQueue(prev => prev.slice(1));
      }, 480);
    }
  }, [homeScoreQueue]);

  useEffect(() => {
    if (guestScoreQueue.length > 1 && !guestScoreAnimating) {
      const newGuestScore = guestScoreQueue[1];
      setGuestScoreAnimating(true);
      setGuestScore(newGuestScore)
      setTimeout(() => {

        setPrevGuestScore(newGuestScore);
        setGuestScoreAnimating(false);
        setGuestScoreQueue(prev => prev.slice(1));
      }, 480);
    }
  }, [guestScoreQueue]);

  useEffect(() => {
    if (gameState?.Home?.TeamName !== undefined || gameState?.Guest?.TeamName !== undefined) {
      setHomeFontSize(getFontSize(gameState?.Home?.TeamName));
      setGuestFontSize(getFontSize(gameState?.Guest?.TeamName));
    }
  }, [incomingGameState]);

  function getFontSize(name) {

    if (name.length <= 7 || name === undefined) {
      return '50px';
    }
    else if (name.length <= 9) {
      return '45px';
    }
  }

  function formatTimer(timerString, showHomeTimeout, showGuestTimeout) {
    if (!timerString) {
      return [];
    }
    const homeTimeout = gameState?.Home?.Timeout.Time || "0:00";
    const guestTimeout = gameState?.Guest?.Timeout.Time || "0:00";
    if (showHomeTimeout && homeTimeout !== "0:00") {
      return homeTimeout;
    }
    else if (showGuestTimeout && guestTimeout !== "0:00") {
      return guestTimeout;
    }
    else {
      return timerString;
    }
  }
  return (
    <div className="container-sport">
      <div className="container-team-sport" style={{ left: "0px" }}>
        {homeScoreAnimating && (
          <>
            <div className="score-sport score-out">{prevHomeScore}</div>
            <div className="score-sport score-in">{homeScore}</div>
          </>
        )}
        {!homeScoreAnimating && (
          <div className="text score-sport">{homeScore}</div>
        )}
        <div className="text team-name-sport" style={{ fontSize: homeFontSize }} >
          {gameState?.Home?.TeamName !== undefined ? gameState?.Home?.TeamName : "HOME"}
        </div>
        <div className="side-numbers">
          <div className=" text side-number" >{gameState?.Home?.PointsPerSets[0] === 0 || ""}</div>
          <div className="text side-number">{gameState?.Home?.PointsPerSets[1] === 0 || ""}</div>
          <div className="text side-number" >{gameState?.Home?.PointsPerSets[2] === 0 || ""}</div>
          <div className="text side-number">{gameState?.Home?.PointsPerSets[3] === 0 || ""}</div>
        </div>
      </div>
      <div className="container-team-sport" style={{ left: "286px" }}>
        {guestScoreAnimating && (
          <>
            <div className="score-sport score-out">{prevGuestScore}</div>
            <div className="score-sport score-in">{guestScore}</div>
          </>
        )}
        {!guestScoreAnimating && (
          <div className="text score-sport">{guestScore}</div>
        )}
        <div className="text team-name-sport" style={{ fontSize: guestFontSize }} >
          {gameState?.Guest?.TeamName !== undefined ? gameState?.Guest?.TeamName : "GUEST"}
        </div>
        <div className="side-numbers" style={{ right: "0px" }}>
          <div className=" text side-number" >{gameState?.Home?.PointsPerSets[0] === 0 || ""}</div>
          <div className="text side-number">{gameState?.Home?.PointsPerSets[1] === 0 || ""}</div>
          <div className="text side-number" >{gameState?.Home?.PointsPerSets[2] === 0 || ""}</div>
          <div className="text side-number">{gameState?.Home?.PointsPerSets[3] === 0 || ""}</div>
        </div >
      </div >


      <div className="text period-sport" style={{ left: "226px" }}>
        {gameState?.Period || "0"}
      </div>
      {
        gameState?.Home?.Possession && (
          <div className="home-possession"></div>
        )
      }
      {
        gameState?.Guest?.Possession && (
          <div className="guest-possession"></div>
        )
      }
      <div className="text timer-sport">
        {formatTimer(
          gameState?.Timer?.Value || "00:00",
          showHomeTimeout,
          showGuestTimeout
        )}

        <img className="logo-stramatel " style={{ top: "90px" }} src="LOGO_Stramatel.gif" />
      </div >
    </div >
  )
}

export default Volleyball;