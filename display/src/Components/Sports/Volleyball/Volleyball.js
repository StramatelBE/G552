import React, { useEffect, useState } from "react";
import "./Volleyball.css";

function Volleyball({ gameState: incomingGameState }) {

  const [homeScore, setHomeScore] = useState(incomingGameState?.Home?.TotalPoints || 0);
  const [guestScore, setGuestScore] = useState(incomingGameState?.Guest?.TotalPoints || 0);

  const [homeFontSize, setHomeFontSize] = useState('45px');
  const [guestFontSize, setGuestFontSize] = useState('45px');

  const [homeScoreQueue, setHomeScoreQueue] = useState([]);
  const [guestScoreQueue, setGuestScoreQueue] = useState([]);

  const [prevHomeScore, setPrevHomeScore] = useState(incomingGameState?.Home?.TotalPoints || 0);
  const [prevGuestScore, setPrevGuestScore] = useState(incomingGameState?.Guest?.TotalPoints || 0);

  const [homeScoreAnimating, setHomeScoreAnimating] = useState(false);
  const [guestScoreAnimating, setGuestScoreAnimating] = useState(false);

  const [currentSet, setCurrentSet] = useState(1);

  const gameState = incomingGameState || {};
  const showHomeTimeout = gameState?.Home?.Timeout?.Time !== "0:00";
  const showGuestTimeout = gameState?.Guest?.Timeout?.Time !== "0:00";



  function calculateCurrentSet(homeSetsWon, guestSetsWon) {
    if (homeSetsWon === 2 && guestSetsWon === 2 || homeSetsWon === 3 && guestSetsWon === 2 || homeSetsWon === 2 && guestSetsWon === 3) {
      return 5;
    } 
    return homeSetsWon + guestSetsWon + 1 > 4 ? 4 : homeSetsWon + guestSetsWon + 1;
  }

  function formatTimer(timerString) {
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

  useEffect(() => {
    setCurrentSet(calculateCurrentSet(gameState?.Home?.SetsWon, gameState?.Guest?.SetsWon));
  }, [incomingGameState]);


  useEffect(() => {
    console.log("gameState", gameState);
    if (gameState?.Home?.TotalPoints !== homeScoreQueue[homeScoreQueue.length - 1] && homeScoreQueue) {
      setHomeScoreQueue(prev => [...prev, gameState?.Home?.TotalPoints]);
    } 
    if (gameState?.Guest?.TotalPoints !== guestScoreQueue[guestScoreQueue.length - 1] && guestScoreQueue) {
      setGuestScoreQueue(prev => [...prev, gameState?.Guest?.TotalPoints]);
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

  const homeBlinkClass = gameState?.Home?.Winner ? "blink" : "";
  const guestBlinkClass = gameState?.Guest?.Winner ? "blink" : "";

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


  return (
    <div className="container">
      <div className="home">
        <div className={`home-text ${homeBlinkClass}`} style={{fontSize: homeFontSize }}>{gameState?.Home?.TeamName || "HOME"}</div>
        <div className="container-score-home">
          {homeScoreAnimating && (
            <>
              <div className="home-number score-out">{prevHomeScore}</div>
              <div className="home-number score-in">{homeScore}</div>
            </>
          )}
          {!homeScoreAnimating && (
            <div className="home-number" >{homeScore}</div>
          )}
        </div>



         <div className="side-numbers">
          <div className="side-number" style={{ top: 0 }}>{gameState?.Home?.PointsBySet[0] === 0 || ""}</div>
          <div className="side-number" style={{ top: 64 }}>{gameState?.Home?.PointsBySet[1] === 0 || ""}</div>
          <div className="side-number" style={{ top: 128 }}>{gameState?.Home?.PointsBySet[2] === 0 || ""}</div>
          <div className="side-number" style={{ top: 192 }}>{gameState?.Home?.PointsBySet[3] === 0 || ""}</div>
        </div>
      </div>
      <div className="guest">
        <div className={`guest-text ${guestBlinkClass}`} style={{fontSize: guestFontSize }}>{gameState?.Guest?.TeamName || "GUEST"}</div>
        <div className="container-score-guest">
          {guestScoreAnimating && (
            <>
              <div className="guest-number score-out">{prevGuestScore}</div>
              <div className="guest-number score-in">{guestScore}</div>
            </>
          )}
          {!guestScoreAnimating && (
            <div className="guest-number">{guestScore}</div>
          )}
        </div>



        <div className="side-numbers" style={{ left: 214 }}>
          <div className="side-number" style={{ top: 0 }}>{gameState?.Guest?.PointsBySet[0] === 0 || ""}</div>
          <div className="side-number" style={{ top: 64 }}>{gameState?.Guest?.PointsBySet[1] === 0 || ""}</div>
          <div className="side-number" style={{ top: 128 }}>{gameState?.Guest?.PointsBySet[2] === 0 || ""}</div>
          <div className="side-number" style={{ top: 192 }}>{gameState?.Guest?.PointsBySet[3] === 0 || ""}</div>
        </div>
      </div>

      {gameState?.Home?.Service && (
          <div className="home-possession"></div>
        )}
      <div className="green-number">{currentSet || "0"}</div>
      {gameState?.Guest?.Service && (
          <div className="guest-possession"></div>
        )}
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

        <div className={`home-fouls ${homeBlinkClass}`}>
          {gameState?.Home?.SetsWon} {/* team HOME fouls */}
        </div>
      <div className="time">{formatTimer(
            gameState?.Timer?.Value || "00:00",
          )}</div>
      <div className={`guest-fouls ${guestBlinkClass}`}>
          {gameState?.Guest?.SetsWon} {/* team HOME fouls */}
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
      <img className="image" src="LOGO_Stramatel.gif" />
    </div>
  )
}

export default Volleyball;
