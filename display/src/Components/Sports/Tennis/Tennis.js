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
    setHomeFontSize(getFontSize(gameState?.Home?.TeamName));
    setGuestFontSize(getFontSize(gameState?.Guest?.TeamName));
}, [incomingGameState]);

function calculateCurrentSet(homeSetsWon, guestSetsWon) {
  return homeSetsWon + guestSetsWon + 1 > 3 ? 3 : homeSetsWon + guestSetsWon + 1;
}
useEffect(() => {
  setCurrentSet(calculateCurrentSet(gameState?.Home?.SetsWon, gameState?.Guest?.SetsWon));
}, [incomingGameState]);

function getFontSize(name) {
  //remove start and end spaces but not in the middle
  name = name.replace(/^\s+|\s+$/g, '');

  console.log(name);
  if (name.length <= 7) {
    return '30px'; // Taille normale
  } 
 else if (name.length <= 9) {
    return '26px'; // Toujours un peu plus petit
  } 

  

  

}
  

  // Determine the color of the service dot for Home and Guest
  const homeServiceDotColor = gameState?.Home?.Service === 1 ? "darkred" : "#006f3c";
  const guestServiceDotColor = gameState?.Guest?.Service === 1 ? "darkred" : "#006f3c";

  // Conditionally apply blinking class
  const homeBlinkClass = gameState?.Home?.Winner ? "blinking" : "";
  const guestBlinkClass = gameState?.Guest?.Winner ? "blinking" : "";



  return (
    <div className="scoreboard">
      <div className="player player-bottom">
        <div className="set-score" style={{ left: "178px" }}>{gameState?.Home?.GameInSet}</div>
        <div className="set-score point" style={{ left: "230px" }}>{gameState?.Home?.Points}</div>
        <div className="set-score" style={{ left: "318px" }}>{gameState?.Home?.PointsInSet[0]}</div>
        <div className="set-score" style={{ left: "385px" }}>{gameState?.Home?.PointsInSet[1]}</div>
        <div className="set-score" style={{ left: "452px" }}>{gameState?.Home?.PointsInSet[2]}</div>
        <div className="dot" style={{ backgroundColor: homeServiceDotColor }}></div>
        <div className={`player-name ${homeBlinkClass}`} style={{ fontSize: homeFontSize}} >{gameState?.Home?.TeamName}</div>
      </div>
      <div className="player player-top">
        <div className="set-score" style={{ left: "178px" }}>{gameState?.Guest?.GameInSet}</div>
        <div className="set-score point" style={{ left: "230px" }}>{gameState?.Guest?.Points}</div>
        <div className="set-score" style={{ left: "318px" }}>{gameState?.Guest?.PointsInSet[0]}</div>
        <div className="set-score" style={{ left: "385px" }}>{gameState?.Guest?.PointsInSet[1]}</div>
        <div className="set-score" style={{ left: "452px" }}>{gameState?.Guest?.PointsInSet[2]}</div>
        <div className="dot" style={{ backgroundColor: guestServiceDotColor }}></div>
        <div className={`player-name ${guestBlinkClass}`} style={{ fontSize: guestFontSize}} >{gameState?.Guest?.TeamName}</div>
      </div>

      <div className="sets">
      <img className="setimage" style={{ left: "-216px" }} src="LOGO_Stramatel_wbg.gif" />
      <div className="set" style={{ left: "-56px" }}>{currentSet}</div>
      <div className="set">PTS</div>
        <div className="set " style={{ left: "81px" }}>S1</div>
        <div className="set" style={{ left: "148px" }}>S2</div>
        <div className="set" style={{ left: "215px" }}>S3</div>        
      </div>
      <div className="timer">{gameState?.Timer?.Value}</div>
    </div>
  );
}

export default Tennis;
