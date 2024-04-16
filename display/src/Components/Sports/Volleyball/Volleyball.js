import React, { useEffect, useState } from "react";
import "./Volleyball.css";

function Volleyball({ gameState: incomingGameState }) {

  const [homeScore, setHomeScore] = useState(incomingGameState?.Home?.Points || 0);
  const [guestScore, setGuestScore] = useState(incomingGameState?.Guest?.Points || 0);

  const [homeScoreQueue, setHomeScoreQueue] = useState([]);
  const [guestScoreQueue, setGuestScoreQueue] = useState([]);

  const [prevHomeScore, setPrevHomeScore] = useState(incomingGameState?.Home?.Points || 0);
  const [prevGuestScore, setPrevGuestScore] = useState(incomingGameState?.Guest?.Points || 0);

  const [homeScoreAnimating, setHomeScoreAnimating] = useState(false);
  const [guestScoreAnimating, setGuestScoreAnimating] = useState(false);

  const gameState = incomingGameState || {};
  const showHomeTimeout = gameState?.Home?.Timeout?.Time !== "0:00";
  const showGuestTimeout = gameState?.Guest?.Timeout?.Time !== "0:00";


  useEffect(() => {
    if (gameState?.Home?.Points !== homeScoreQueue[homeScoreQueue.length - 1] && homeScoreQueue) {
      setHomeScoreQueue(prev => [...prev, gameState?.Home?.Points]);
    }
    if (gameState?.Guest?.Points !== guestScoreQueue[guestScoreQueue.length - 1] && guestScoreQueue) {
      setGuestScoreQueue(prev => [...prev, gameState?.Guest?.Points]);
    }
  }, [incomingGameState]);

  useEffect(() => {
    if (homeScoreQueue.length > 1 && !homeScoreAnimating) {
      const newHomeScore = homeScoreQueue[1]; // Take the first element without removing it
      setHomeScoreAnimating(true);
      setHomeScore(newHomeScore)
      setTimeout(() => {
        setPrevHomeScore(newHomeScore);
        setHomeScoreAnimating(false);

        setHomeScoreQueue(prev => prev.slice(1)); // Remove the first element after animation
      }, 480);
    }
  }, [homeScoreQueue]);

  useEffect(() => {
    if (guestScoreQueue.length > 1 && !guestScoreAnimating) {
      const newGuestScore = guestScoreQueue[1]; // Take the first element without removing it
      setGuestScoreAnimating(true);
      setGuestScore(newGuestScore)
      setTimeout(() => {

        setPrevGuestScore(newGuestScore);
        setGuestScoreAnimating(false);
        setGuestScoreQueue(prev => prev.slice(1)); // Remove the first element after animation
      }, 480);
    }
  }, [guestScoreQueue]);

  return (
    <div className="container">
      <div className="home-container">
        <div className="home-text">{gameState?.Home?.TeamName || "HOME"}</div>

        {guestScoreAnimating && (
          <>
            <div className="home-number score-out">{prevGuestScore}</div>
            <div className="home-number score-in">{guestScore}</div>
          </>
        )}
        {!guestScoreAnimating && (
          <div className="home-number">{guestScore}</div>
        )}



        <div className="side-numbers">
          <div className="side-number" style={{ top: 0 }}>{gameState?.Home?.PointsPerSets[0] === 0 || ""}</div>
          <div className="side-number" style={{ top: 64 }}>{gameState?.Home?.PointsPerSets[1] === 0 || ""}</div>
          <div className="side-number" style={{ top: 128 }}>{gameState?.Home?.PointsPerSets[2] === 0 || ""}</div>
          <div className="side-number" style={{ top: 192 }}>{gameState?.Home?.PointsPerSets[3] === 0 || ""}</div>
        </div>
      </div>
      <div className="guest-container">
        <div className="guest-text">{gameState?.Guest?.TeamName || "GUEST"}</div>

        {guestScoreAnimating && (
          <>
            <div className="guest-number score-out">{prevGuestScore}</div>
            <div className="guest-number score-in">{guestScore}</div>
          </>
        )}
        {!guestScoreAnimating && (
          <div className="guest-number">{guestScore}</div>
        )}



        <div className="side-numbers" style={{ left: 214 }}>
          <div className="side-number" style={{ top: 0 }}>{gameState?.Guest?.PointsPerSets[0] === 0 || ""}</div>
          <div className="side-number" style={{ top: 64 }}>{gameState?.Guest?.PointsPerSets[1] === 0 || ""}</div>
          <div className="side-number" style={{ top: 128 }}>{gameState?.Guest?.PointsPerSets[2] === 0 || ""}</div>
          <div className="side-number" style={{ top: 192 }}>{gameState?.Guest?.PointsPerSets[3] === 0 || ""}</div>
        </div>
      </div>
      <div className="green-number">{gameState?.Period || "0"}</div>
      <div className="time">{gameState?.Timer?.Value || "00:00"}</div>
      <img className="image" src="LOGO_Stramatel.gif" />
    </div>
  )
}

export default Volleyball;
