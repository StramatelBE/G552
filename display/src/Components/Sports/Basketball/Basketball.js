import React, { useEffect, useState } from "react";
import "./Basketball.css";

function Basketball({ gameState: incomingGameState }) {
  const [homeScore, setHomeScore] = useState(0);
  const [guestScore, setGuestScore] = useState(0);
  const [prevHomeScore, setPrevHomeScore] = useState(0);
  const [prevGuestScore, setPrevGuestScore] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHomeScore((prevScore) => prevScore + 1);
      setGuestScore((prevScore) => prevScore + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setPrevHomeScore(homeScore);
    setPrevGuestScore(guestScore);
  }, [homeScore, guestScore]);

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

  const gameState = incomingGameState || {};
  const showHomeTimeout = gameState?.Home?.Timeout?.Time !== "0:00";
  const showGuestTimeout = gameState?.Guest?.Timeout?.Time !== "0:00";

  return (
    <div className="container">
      <div className="home">
        <div className="home-score">{homeScore}</div>
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

        <div className={`guest-score score`}>{guestScore}</div>{" "}
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