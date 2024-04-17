import React, { useEffect, useState } from "react";
import "./Basketball.css";

function Basketball({ gameState: incomingGameState }) {
  const [homeScore, setHomeScore] = useState(incomingGameState?.Home?.Points || 0);
  const [guestScore, setGuestScore] = useState(incomingGameState?.Guest?.Points || 0);

  const [homeFontSize, setHomeFontSize] = useState('45px');
  const [guestFontSize, setGuestFontSize] = useState('45px');

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

  useEffect(() => {
    setHomeFontSize(getFontSize(gameState?.Home?.TeamName));
    setGuestFontSize(getFontSize(gameState?.Guest?.TeamName));
}, [incomingGameState]);

function getFontSize(name) {
  //remove start and end spaces but not in the middle
  name = name.replace(/^\s+|\s+$/g, '');

  console.log(name);
  if (name.length <= 7) {
    return '45px'; // Taille normale
  } 
 else if (name.length <= 9) {
    return '40px'; // Toujours un peu plus petit
  } 
}
function renderFoulCount(foulCount) {
  // If the foul count is 8, display a red square instead
  return foulCount === 8 ? (
    <div className="foul-square" style={{ width: '45px', height: '45px', backgroundColor: 'red' }} />
  ) : (
    <div className="foul-number">{foulCount}</div>
  );
}






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
              <div className="home-score score-in">{homeScore}</div>
            </>
          )}
          {!homeScoreAnimating && (
            <div className="home-score">{homeScore}</div>
          )}
        </div>
        <div className="home-name" style={{fontSize: homeFontSize }}>
          {gameState?.Home?.TeamName || "HOME"} {/* team name HOME */}
        </div>
        {gameState?.Home?.Timeout?.Count >= 0 && (
          <>
            {[...Array(gameState?.Home?.Timeout?.Count)].map((_, i) => (
              <div
                key={i}
                className="home-timeout"
                style={{ top: `${139 + i * 20}px` }}
              />
            ))}
          </>
        )}
    
            
        <div className="home-fouls">
        {renderFoulCount(gameState?.Home?.Fouls?.Team) || "0"}
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
        <div className="guest-name" style={{fontSize: guestFontSize }}>
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
        {gameState?.Guest?.Timeout?.Count >= 0 && (
          <>
            {[...Array(gameState?.Guest?.Timeout?.Count)].map((_, i) => (
              <div
                key={i}
                className="guest-timeout"
                style={{ top: `${139 + i * 20}px` }}
              />
            ))}
          </>
        )}

        <div className="guest-fouls">
        {renderFoulCount(gameState?.Guest?.Fouls?.Team) || "0"}
        </div>
      </div>

      <img className="image" src="LOGO_Stramatel.gif" />{" "}
      <img className="fiba-image" src="fiba.png" />{" "}
    </div>
  );

}

export default Basketball;