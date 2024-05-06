import React, { useEffect, useState } from "react";
import "./Basketball.css";

function Basketball({ gameState: incomingGameState }) {
  const [homeScore, setHomeScore] = useState(incomingGameState?.Home?.Points || 0);
  const [guestScore, setGuestScore] = useState(incomingGameState?.Guest?.Points || 0);

  const [homeFontSize, setHomeFontSize] = useState('50px');
  const [guestFontSize, setGuestFontSize] = useState('50px');

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
    if (gameState?.Home?.TeamName !== undefined || gameState?.Guest?.TeamName !== undefined) {
      setHomeFontSize(getFontSize(gameState?.Home?.TeamName));
      setGuestFontSize(getFontSize(gameState?.Guest?.TeamName));
    }
  }, [incomingGameState]);


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


  function getFontSize(name) {

    if (name.length <= 7 || name === undefined) {
      return '50px'; // Taille normale
    }
    else if (name.length <= 9) {
      return '45px'; // Toujours un peu plus petit
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
    <div className="container">
      <div className="home">
        <div className="container-score-home">
          {homeScoreAnimating && (
            <>
              <div className="home-score score-out">{prevHomeScore}</div>
              <div className="home-score score-in">{homeScore}</div>
            </>
          )}
          {!homeScoreAnimating && (
            <div className="home-score">{homeScore}</div>
          )}
        </div>
        <div className="home-name">
          {gameState?.Home?.TeamName || "HOME"} {/* team name HOME */}
        </div>
        {gameState?.Home?.Timeout?.Team >= 0 && (
          <>
            {[...Array(3 - gameState?.Home?.Timeout?.Team)].map((_, i) => (
              <div
                key={i}
                className="home-timeout"
                style={{ top: `${139 + i * 20}px` }}
              />
            ))}
          </>
        )}
        <div className="home-fouls">
          {gameState?.Home?.Fouls?.Team} {/* team HOME fouls */}
        </div>
        {gameState?.Home?.Possession && (
          <div className="home-possession"></div>
        )}
      </div>

      <div className="center">
        <div className="period">
          {gameState?.Period || "0"} {/* period */}
        </div>
        {gameState?.Guest?.Possession && (
          <div className="guest-possession"></div>
        )}
        <div className="timer-Basketball ">
          {formatTimer(
            gameState?.Timer?.Value || "00:00",
            showHomeTimeout,
            showGuestTimeout
          )}
        </div>
      </div>

      <div className="guest">
        <div className="guest-name">
          {gameState?.Guest?.TeamName || "GUEST"} {/* team name GUEST */}
        </div>{" "}

        <div className="container-score-guest">
          {guestScoreAnimating && (
            <>
              <div className="guest-score score-out">{prevGuestScore}</div>
              <div className="guest-score score-in">{guestScore}</div>
            </>
          )}
          {!guestScoreAnimating && (
            <div className="guest-score">{guestScore}</div>
          )}


        </div>
        <div className="text timeout-hand" style={{ right: '120px', top: "140px" }}>
          {gameState?.Home?.Timeout?.Team >= 0 && (
            [...Array(3 - gameState?.Home?.Timeout?.Team)].map((_, i) => (
              <div
                key={i}
                className="timeout-dot-sport"
                style={{ top: `${20 + i * 20}px` }}
              />
            ))
          )}
        </div>
        <div className="fouls-basket" style={{ right: "70px", top: "195px" }}>
          {gameState?.Guest?.Fouls?.Team}
        </div>
      </div>
      {/* MIDDLE */}
      <div className="text period-sport" style={{ left: "226px" }}>
        {gameState?.Period || "0"}
      </div>
      {gameState?.Home?.Possession && (
        <div className="home-possession"></div>
      )}
      {gameState?.Guest?.Possession && (
        <div className="guest-possession"></div>
      )}
      <div className="text timer-sport">
        {formatTimer(
          gameState?.Timer?.Value || "00:00",
          showHomeTimeout,
          showGuestTimeout
        )}
        <img className="logo-fiba " style={{ left: "460px" }} src="fiba.png" />{" "}
        <img className="logo-stramatel " style={{ top: "90px" }} src="LOGO_Stramatel.gif" />
      </div>

    </div >
  );

}

export default Basketball;