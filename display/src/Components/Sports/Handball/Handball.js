import React, { useEffect, useState } from 'react';
import "./Handball.css";

function Handball({ gameState: incomingGameState }) {
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

  function formatExclusionTimer(timer) {
    if (timer === 0) {
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
    }  else if (timerStr.length === 2) {
      return `0:${timerStr}`;

    }else if (timerStr.length === 1) {
      return `0:0${timerStr}`;
    }
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
      <div className="absolute-div home-div">
        <div className="team-name-div" style={{ left: "0px", top: "90px", fontSize: homeFontSize }} >{gameState?.Home?.TeamName !== "" ? gameState?.Home?.TeamName : "HOME"}</div>
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
        {gameState?.Home?.Timeout?.Counts >= 0 && (
          <div className="dots-div" style={{ left: '10px', top: '140px' }}>
            {[...Array(gameState?.Home?.Timeout?.Counts)].map((_, i) => (
              <div
                key={i}
                className="dot-hand"
                style={{ top: `${46 - i * 23}px`, }}
              />
            ))}

          </div>
        )}
        {// If the game is a rink, display the team fouls
          (
          <div className="home-fouls" >
           
          </div>
        )
      }
        <div className="time-div" style={{ left: '60px', top: '211px' }}>{formatExclusionTimer(gameState?.Home?.Exclusion?.Timer[2]) || ""}</div>
        <div className="shirt-div" style={{ left: '0px', top: '211px' }}>{gameState?.Home?.Exclusion?.ShirtNumber[2] || ""}</div>


        <div className="time-div" style={{ left: '60px', top: '175px' }}>{formatExclusionTimer(gameState?.Home?.Exclusion?.Timer[1]) || ""}</div>
        <div className="shirt-div" style={{ left: '0px', top: '175px' }}>{gameState?.Home?.Exclusion?.ShirtNumber[1] || ""}</div>

        <div className="time-div" style={{ left: '60px', top: '139px' }}>{formatExclusionTimer(gameState?.Home?.Exclusion?.Timer[0]) || ""}</div>
        <div className="shirt-div" style={{ left: '0px', top: '139px' }}>{gameState?.Home?.Exclusion?.ShirtNumber[0] || ""}</div>

      </div>
      <div className="container-score-guest">
  

        {guestScoreAnimating && (
            <>
              <div className="guest-score score-out">{prevGuestScore}</div>
              <div className="guest-score score-in">{guestScore}</div>
            </>
          )}
          {!guestScoreAnimating && (
            <div className="home-score">{guestScore}</div>
          )}

        


      </div>
      <div className="absolute-div guest-div">
        <div className="team-name-div" style={{ left: "0px", top: " 90px", fontSize: guestFontSize }} > {gameState?.Guest?.TeamName !== "" ? gameState?.Guest?.TeamName : "GUEST"}</div>
        {gameState?.Home?.Timeout?.Counts >= 0 && (
          <div className="dots-div" style={{ left: "202px", top: '140px' }}>
            {[...Array(gameState?.Guest?.Timeout?.Counts)].map((_, i) => (
              <div
                key={i}
                className="dot-hand"
                style={{ top: `${46 - i * 23}px`, }}
              />
            ))}

          </div>
        )}
        {// If the game is a rink, display the team fouls
         (
          <div className="guest-fouls">
            {gameState?.Guest?.Fouls?.Team || "0"}
          </div>
        )

        }
        <div className="time-div" style={{ left: '118px', top: '211px' }}>{formatExclusionTimer(gameState?.Guest?.Exclusion?.Timer[2]) || ""}</div>
        <div className="shirt-div" style={{ left: '59px', top: '211px' }}>{gameState?.Guest?.Exclusion?.ShirtNumber[2] || ""}</div>

        <div className="time-div" style={{ left: '118px', top: '175px' }}>{formatExclusionTimer(gameState?.Guest?.Exclusio?.Timer[1]) || ""}</div>
        <div className="shirt-div" style={{ left: '59px', top: '175px' }}>{gameState?.Guest?.Exclusion?.ShirtNumber[1] || ""}</div>

        <div className="time-div" style={{ left: '118px', top: '139px' }}>{formatExclusionTimer(gameState?.Guest?.Exclusion?.Timer[0]) || ""}</div>
        <div className="shirt-div" style={{ left: '59px', top: '139px' }}>{gameState?.Guest?.Exclusion?.ShirtNumber[0] || ""}</div>

      </div>
      <div className="countdown-container">
        <div className="countdown-text">{formatTimer(
          gameState?.Timer?.Value || "00:00",
          showHomeTimeout,
          showGuestTimeout
        )}</div>
        <div className="round-number">{gameState?.Period || "1"}</div>
      </div>
      <img className="image-handball" src="LOGO_Stramatel.gif" />{" "}
    </div>
  );
};
export default Handball;