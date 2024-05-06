import React, { useEffect } from "react";
import "./Tennis.css";

function Tennis({ gameState: incomingGameState }) {
  const gameState = incomingGameState || {};

  const [homeFontSize, setHomeFontSize] = React.useState('45px');
  const [guestFontSize, setGuestFontSize] = React.useState('45px');

  const [currentSet, setCurrentSet] = React.useState(1);

  // Handle special scoring when points reach 17
  if (gameState?.Home?.Points === 99 && gameState?.Guest?.Points === 98) {
    gameState.Home.Points = "A";
    gameState.Guest.Points = "-";
  } else if (gameState?.Guest?.Points === 99 && gameState?.Home?.Points === 98) {
    gameState.Guest.Points = "A";
    gameState.Home.Points = "-";
  }


  useEffect(() => {
    if (gameState?.Home?.TeamName !== undefined || gameState?.Guest?.TeamName !== undefined) {
      setHomeFontSize(getFontSize(gameState?.Home?.TeamName));
      setGuestFontSize(getFontSize(gameState?.Guest?.TeamName));
    }
  }, [incomingGameState]);

  function calculateCurrentSet(homeSetsWon, guestSetsWon) {
    return homeSetsWon + guestSetsWon + 1 > 3 ? 3 : homeSetsWon + guestSetsWon + 1;
  }
  useEffect(() => {
    setCurrentSet(calculateCurrentSet(gameState?.Home?.SetsWon, gameState?.Guest?.SetsWon));
  }, [incomingGameState]);

  function getFontSize(name) {
    if (name.length <= 7) {
      return '30px'; // Taille normale
    }
    else if (name.length <= 9) {
      return '26px'; // Toujours un peu plus petit
    }





  }


  // Determine the color of the service dot for Home and Guest
  const homeServiceDotColor = gameState?.Home?.Service === 1 ? "darkred" : "#005239";
  const guestServiceDotColor = gameState?.Guest?.Service === 1 ? "darkred" : "#005239";

  // Conditionally apply blinking class
  const homeBlinkClass = gameState?.Home?.Winner ? "blinking" : "";
  const guestBlinkClass = gameState?.Guest?.Winner ? "blinking" : "";



  return (
    <div className="scoreboard">
      <div className="container-tennis">
        <div className="timer">{gameState?.Timer?.Value}</div>
        <div className="player">
          <div className={` player-margin player-name ${guestBlinkClass}`} style={{ fontSize: guestFontSize }}   >{gameState?.Home?.TeamName}</div>
          <div className="dot" style={{ backgroundColor: "red" }}></div>
          <div className="player-margin set-score" >{gameState?.Home?.GameInSet}</div>
          <div className="player-margin set-score point" >{gameState?.Home?.Points}</div>
          {gameState?.Home?.PointsInSet[0] !== 0 && <div className="player-margin set-score" >{gameState?.Home?.PointsInSet[0]}</div>}
          {gameState?.Home?.PointsInSet[1] !== 0 && <div className="player-margin set-score" >{gameState?.Home?.PointsInSet[1]}</div>}
          {gameState?.Home?.PointsInSet[2] !== 0 && <div className="player-margin set-score" >{gameState?.Home?.PointsInSet[2]}</div>}
          {gameState?.Home?.PointsInSet[3] !== 0 && <div className="player-margin set-score" >{gameState?.Home?.PointsInSet[3]}</div>}


          {/* {gameState?.Guest?.PointsInSet[0] !== 0 && <div className="player-margin set-score" >{gameState?.Guest?.PointsInSet[0]}</div>}
          {gameState?.Guest?.PointsInSet[1] !== 0 && <div className="player-margin set-score" >{gameState?.Guest?.PointsInSet[1]}</div>}
          {gameState?.Guest?.PointsInSet[2] !== 0 && <div className="player-margin set-score" >{gameState?.Guest?.PointsInSet[2]}</div>}
          {gameState?.Guest?.PointsInSet[3] !== 0 && <div className="player-margin set-score" >{gameState?.Guest?.PointsInSet[3]}</div>} */}
        </div>
        <div className="sets">
          <div className={` player-margin set-player-name  ${guestBlinkClass}`} style={{ fontSize: guestFontSize }}   >{gameState?.Home?.TeamName}</div>
          <div className="dot"></div>
          <div className="player-margin set-text" >{currentSet}</div>
          <div className="player-margin set-text point" >PTS</div>

          {gameState?.Guest?.PointsInSet[0] !== 0 && <div className="player-margin set-text" >S1</div>}
          {gameState?.Guest?.PointsInSet[1] !== 0 && <div className="player-margin set-text" >S2</div>}
          {gameState?.Guest?.PointsInSet[2] !== 0 && <div className="player-margin set-text" >S3</div>}
          {gameState?.Guest?.PointsInSet[3] !== 0 && <div className="player-margin set-text" >S4</div>}
        </div>
        {/*  <div className="player player-top">
        <div className="set-score" style={{ left: "178px" }}>{gameState?.Guest?.GameInSet}</div>
        <div className="set-score point" style={{ left: "230px" }}>{gameState?.Guest?.Points}</div>
          <div className="set-score" style={{ left: "318px" }}>{gameState?.Guest?.PointsInSet[0]}</div>
        <div className="set-score" style={{ left: "385px" }}>{gameState?.Guest?.PointsInSet[1]}</div>
        <div className="set-score" style={{ left: "452px" }}>{gameState?.Guest?.PointsInSet[2]}</div>
        <div className="dot" style={{ backgroundColor: guestServiceDotColor }}></div>
        <div className={`player-name ${guestBlinkClass}`} style={{ fontSize: guestFontSize }} >{gameState?.Guest?.TeamName}</div>
      </div> */}


      </div>

    </div>
  );
}

export default Tennis;
