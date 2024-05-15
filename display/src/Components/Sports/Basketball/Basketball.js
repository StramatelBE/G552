import React, { useEffect, useState } from "react";
import "./Basketball.css";
import "../globalSport.css";

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
    <div className="container-sport">
      {/* HOME */}
      <div className="container-team-sport" style={{ left: "0px" }}>
        <div className="text timeout-hand" style={{ left: '120px', top: "140px" }}>
          {gameState?.Home?.Timeout?.Count >= 0 && (
            [...Array(gameState?.Home?.Timeout?.Count)].map((_, i) => (
              <div
                key={i}
                className="timeout-dot-sport"
                style={{ top: `${20 + i * 20}px` }}
              />
            ))
          )}
        </div>
        <div className="container-score" style={{ left: "0px", top: "0px" }} >
          {homeScoreAnimating && (
            <>
              <div className=" text score-sport score-out">{prevHomeScore}</div>
              <div className=" text score-sport score-in">{homeScore}</div>
            </>
          )}
          {!homeScoreAnimating && (
            <div className="text score-sport">{homeScore}</div>
          )}
        </div>
        <div className="text team-name-sport" style={{ fontSize: homeFontSize, left: "0px", top: "90px" }} >
          {gameState?.Home?.TeamName !== undefined ? gameState?.Home?.TeamName : "HOME"}
        </div>
        {
          gameState?.Home?.Fouls?.Team === 9 ?
            (<div className="text fouls-basket" style={{ left: "70px", top: "210px" }}>
              <div className="square-fouls-basket" />
            </div>)
            :
            (<div className="text fouls-basket" style={{ left: "70px", top: "210px" }}>
              {gameState?.Home?.Fouls?.Team}
            </div>)
        }
      </div>

      {/* GUEST */}
      < div className="container-team-sport" style={{ left: "286px" }
      }>
        <div className="container-score" style={{ right: "0px", top: "0px" }} >
          {guestScoreAnimating && (
            <>
              <div className="text score-sport score-out">{prevGuestScore}</div>
              <div className=" text score-sport score-in">{guestScore}</div>
            </>
          )}
          {!guestScoreAnimating && (
            <div className="text score-sport">{guestScore}</div>
          )}
        </div>
        <div className="text team-name-sport" style={{ fontSize: homeFontSize, left: "0px", top: "90px" }} >
          {gameState?.Guest?.TeamName !== undefined ? gameState?.Guest?.TeamName : "HOME"}
        </div>
        <div className="text timeout-hand" style={{ right: '120px', top: "140px" }}>
          {gameState?.Guest?.Timeout?.Count >= 0 && (
            [...Array(gameState?.Guest?.Timeout?.Count)].map((_, i) => (
              <div
                key={i}
                className="timeout-dot-sport"
                style={{ top: `${20 + i * 20}px` }}
              />
            ))
          )}
        </div>
        {
          gameState?.Guest?.Fouls?.Team === 9 ?
            (<div className="text fouls-basket" style={{ right: "70px", top: "210px" }}>
              <div className="square-fouls-basket" />
            </div>)
            :
            (<div className="text fouls-basket" style={{ right: "70px", top: "210px" }}>
              {gameState?.Guest?.Fouls?.Team}
            </div>)
        }
      </div >



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
        <img className="logo-fiba" style={{ right: "66px" }} src="fiba.png" />{" "}
        <img className="logo-stramatel " style={{ top: "90px" }} src="LOGO_Stramatel.gif" />
      </div>

    </div >
  );

}

export default Basketball;