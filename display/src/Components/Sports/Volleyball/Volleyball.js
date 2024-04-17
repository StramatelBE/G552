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

  const currentSet = calculateCurrentSet(gameState?.Home?.SetsWon, gameState?.Guest?.SetsWon);


  function calculateCurrentSet(homeSetsWon, guestSetsWon) {
    return homeSetsWon + guestSetsWon + 1 > 3 ? 3 : homeSetsWon + guestSetsWon + 1;
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
      <div className="home-container">
        <div className="home-text" style={{fontSize: homeFontSize }}>{gameState?.Home?.TeamName || "HOME"}</div>
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
      <div className="guest-container">
        <div className="guest-text" style={{fontSize: guestFontSize }}>{gameState?.Guest?.TeamName || "GUEST"}</div>
        <div className="container-score-guest-volleyball">
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
      <div className="green-number">{currentSet || "0"}</div>
      <div className="time">{gameState?.Timer?.Value || "00:00"}</div>
      <img className="image" src="LOGO_Stramatel.gif" />
    </div>
  )
}

export default Volleyball;
