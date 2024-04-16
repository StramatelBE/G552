import React, { useEffect, useState } from "react";
import "./Basketball.css";

function Basketball({ gameState: incomingGameState }) {
  const [homeScoreQueue, setHomeScoreQueue] = useState([]);
  const [guestScoreQueue, setGuestScoreQueue] = useState([]);
  const [prevHomeScore, setPrevHomeScore] = useState(0);
  const [prevGuestScore, setPrevGuestScore] = useState(0);

  const [homeScoreAnimating, setHomeScoreAnimating] = useState(false);
  const [guestScoreAnimating, setGuestScoreAnimating] = useState(false);

  const gameState = incomingGameState || {};
  const showHomeTimeout = gameState?.Home?.Timeout?.Time !== "0:00";
  const showGuestTimeout = gameState?.Guest?.Timeout?.Time !== "0:00";


  useEffect(() => {
    if (gameState?.Home?.Points !== prevHomeScore) {
      setHomeScoreQueue(prev => [...prev, gameState?.Home?.Points]);
    }
    if (gameState?.Guest?.Points !== prevGuestScore) {
      setGuestScoreQueue(prev => [...prev, gameState?.Guest?.Points]);
    }
  }, [incomingGameState]);

 useEffect(() => {
  if (homeScoreQueue.length > 0) {
    const newHomeScore = homeScoreQueue[0]; // Take the first element without removing it
    setHomeScoreAnimating(true);
    setPrevHomeScore(newHomeScore);
    setTimeout(() => {
      setHomeScoreAnimating(false);
      setHomeScoreQueue(prev => prev.slice(1)); // Remove the first element after animation

    }, 480);
  }
}, [homeScoreQueue]);

useEffect(() => {
  if (guestScoreQueue.length > 0) {
    const newGuestScore = guestScoreQueue[0]; // Take the first element without removing it
    setGuestScoreAnimating(true);
    setPrevGuestScore(newGuestScore);
    setTimeout(() => {
      setGuestScoreAnimating(false);
      setGuestScoreQueue(prev => prev.slice(1)); // Remove the first element after animation
    }, 480);
  }
}, [guestScoreQueue]);





  function formatTimer(timerString, showHomeTimeout, showGuestTimeout) {
    if (!timerString) {
      return [];
    }

    timerString = timerString.toString();
    const characters = timerString.slice(0, 5).split("");

    while (characters.length < 5) {
      characters.push("");
    }
    // Ajoute un espace insécable avant le timer de timeout s'il commence par "0:"
    if (characters[0] === "0" && characters[1] === ":") {
      characters.unshift("\u00A0");
    }

    const homeTimeout = gameState?.Home?.Timeout.Time || "0:00";
    const guestTimeout = gameState?.Guest?.Timeout.Time || "0:00";

    if (showHomeTimeout && homeTimeout !== "0:00") {
      return formatTimer(homeTimeout);
    }

    if (showGuestTimeout && guestTimeout !== "0:00") {
      return formatTimer(guestTimeout);
    }

    return characters.map((char, index) => {
      return (
        <span
          key={index}
          style={{
            fontFamily: "D-DIN-Bold",
            display: "inline-block",
            width: "45px",
            textAlign: "center",
            ...(index === 2 && { paddingBottom: "5px" })
          }}
        >
          {char}
        </span>
      );
    });
  }


  return (
    <div className="container">
      <div className="home">
        <div className="container-score-home">
          {homeScoreAnimating && (
            <>
              <div className="home-score score-out">{prevHomeScore}</div>
              <div className="home-score score-in">{gameState?.Home?.Points}</div>
            </>
          )}
          {!homeScoreAnimating && (
            <div className="home-score">{gameState?.Home?.Points}</div>
          )}
        </div>
        <div className="home-name">
          {gameState?.Home?.TeamName || "HOME"} {/* team name HOME */}
        </div>

        {gameState?.Home?.Timeout?.Team > 0 && (
          <>
            {[...Array(gameState?.Home?.Timeout?.Team || 0)].map((_, i) => (
              <div
                key={i}
                className="home-timeout"
                style={{ top: `${139 + i * 20}px` }}
              />
            ))}
          </>
        )}{/* team HOME time out */}

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
              <div className="guest-score score-in">{gameState?.Guest?.Points}</div>
            </>
          )}
          {!guestScoreAnimating && (
            <div className="guest-score">{gameState?.Guest?.Points}</div>
          )}


        </div>
        {gameState?.Guest?.Timeout?.Team > 0 && (
          <>
            {[...Array(gameState?.Guest?.Timeout?.Team || 0)].map((_, i) => (
              <div
                key={i}
                className="guest-timeout"
                style={{ top: `${139 + i * 20}px` }}
              />
            ))}
          </>
        )}{/* team GUEST time out */}

        <div className="guest-fouls">
          {gameState?.Guest?.Fouls?.Team} {/* team GUEST fouls */}
        </div>
      </div>

      <img className="image" src="LOGO_Stramatel.gif" />{" "}
      <img className="fiba-image" src="fiba.png" />{" "}
    </div>
  );

}

export default Basketball;