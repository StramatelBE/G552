import React, { useEffect, useState } from 'react';
import "./Handball.css";
import "../globalSport.css";

function Handball({ gameState: incomingGameState }) {
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

  const isRink = gameState?.insertType === "RINK";

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

  useEffect(() => {
    if (gameState?.Home?.TeamName !== undefined || gameState?.Guest?.TeamName !== undefined) {
      setHomeFontSize(getFontSize(gameState?.Home?.TeamName));
      setGuestFontSize(getFontSize(gameState?.Guest?.TeamName));
    }
  }, [incomingGameState]);

  function getFontSize(name) {

    if (name.length <= 7 || name === undefined) {
      return '50px'; // Taille normale
    }
    else if (name.length <= 9) {
      return '45px'; // Toujours un peu plus petit
    }
  }

  function formatExclusionTimer(timer) {
    if (timer === 0 || timer === "0" || timer === "" || timer === undefined) {
      return 0;
    }
    // Convertit le nombre en chaîne de caractères
    const timerStr = timer.toString();
    // Assurez-vous que la chaîne est de longueur 3
    if (timerStr.length === 3) {
      // Extrait chaque chiffre
      const firstDigit = timerStr[0];
      const secondDigit = timerStr[1];
      const thirdDigit = timerStr[2];

      // Formatte et renvoie la nouvelle chaîne
      return `${firstDigit}:${secondDigit}${thirdDigit}`;
    } else if (timerStr.length === 2) {
      return `0:${timerStr}`;

    } else if (timerStr.length === 1) {
      return `0:0${timerStr}`;
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
      {gameState.sport === "rinkhockey" && (<div className="faute-exclution " style={{ fontSize: "40px", left: "0px", top: "5px" }} >
        {gameState.Home.Exclusion.Counts}
      </div>)}
      <div className="container-team-sport" style={{ left: "0px" }}>
        <div className="text timeout-hand" style={{ left: '10px' }}>
          {gameState?.Home?.Timeout?.Counts >= 0 && (
            [...Array(gameState?.Home?.Timeout?.Counts)].map((_, index) => (
              <div
                key={index}
                className="timeout-dot-sport"
                style={{ top: `${200 - index * 25}px`, }}
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
        {gameState?.Home?.Exclusion?.Timer?.map((timer, index) => {
          if (timer > 0) {
            return (
              <div className="time-exclusion-sport" style={{ top: `${140 + index * 35}px`, left: '10px', fontSize: '35px' }} key={index}>
                <div style={{ color: "#ff0000" }}> {`${gameState?.Home?.Exclusion?.ShirtNumber[index]}`}

                </div>
                <span>&nbsp;</span>
                <div style={{ color: "#ebff00" }}>{formatExclusionTimer(timer) || ""}
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
      {/* GUEST */}
      {gameState.sport === "rinkhockey" && (<div className="faute-exclution " style={{ fontSize: "40px", right: "0px", top: "5px" }} >
        {gameState.Guest.Exclusion.Counts}
      </div>)}

      <div className="container-team-sport" style={{ left: "286px" }}>

        <div className="text timeout-hand" style={{ right: '10px' }}>
          {gameState?.Guest?.Timeout?.Counts >= 0 && (
            [...Array(gameState?.Guest?.Timeout?.Counts)].map((_, index) => (
              <div
                key={index}
                className="timeout-dot-sport"
                style={{ top: `${200 - index * 25}px`, }}
              />
            ))
          )}
        </div>
        <div className="container-score" style={{ right: "0px", top: "0px" }} >
          {guestScoreAnimating && (
            <>
              <div className="score-sport score-out">{prevGuestScore}</div>
              <div className="score-sport score-in">{guestScore}</div>
            </>
          )}
          {!guestScoreAnimating && (
            <div className="text score-sport">{guestScore}</div>
          )}
        </div>
        <div className="text team-name-sport" style={{ fontSize: guestFontSize, left: "0px", top: "90px" }} >
          {gameState?.Guest?.TeamName !== undefined ? gameState?.Guest?.TeamName : "GUEST"}
        </div>
        {gameState?.Guest?.Exclusion?.Timer?.map((timer, index) => {
          if (timer > 0) {
            return (
              <div className="time-exclusion-sport" style={{ top: `${140 + index * 35}px`, right: '10px', fontSize: '35px' }} key={index}>
                <div style={{ color: "#ff0000" }}>{`${gameState?.Guest?.Exclusion?.ShirtNumber[index]}` + " "}
                </div>
                <span>&nbsp;</span>
                <div style={{ color: "#ebff00" }}>{formatExclusionTimer(timer) || ""}
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}

      </div >

      <div className="text period-sport" style={{ left: "226px" }}>
        {gameState?.Period || "0"}
      </div>
      <div className="text timer-sport">
        {formatTimer(
          gameState?.Timer?.Value || "00:00",
          showHomeTimeout,
          showGuestTimeout
        )}
        <img className="logo-stramatel " style={{ top: "90px" }} src="LOGO_Stramatel.gif" />
      </div>
    </div >
  );
};
export default Handball;
