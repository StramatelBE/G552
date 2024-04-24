import React, { useEffect, useState } from "react";

import Basketball from "./Sports/Basketball/Basketball"
import Handball from "./Sports/Handball/Handball"
import Tennis from "./Sports/Tennis/Tennis"
import Volleyball from "./Sports/Volleyball/Volleyball"
import i18next from "i18next";

//TODO: DISPLAY TIMEOUT COUNTDOWN WHEN TIMEOUT IS CALLED

const SPORT_COMPONENT_MAP = {
  Basketball: Basketball,
  Handball: Handball,
  Tennis: Tennis,
  Volleyball: Volleyball,

};


  


const ScoringMode = ({ gameState }) => {
  const [sport, setSport] = useState("none");
  const [homeTN, setHomeTN] = useState("Home");
  const [guestTN, setGuestTN] = useState("Guest");
  
  function updateTeamNames(gameState) {
    // Set the language for i18next based on gameState
    i18next.changeLanguage(gameState.Language);
  
    if (gameState.Home.TeamName.trim() === 'Home') {
      setHomeTN(i18next.t('Scoreboard.Home'));
      console.log(gameState.Home.TeamName);
    } else {
      setHomeTN(gameState.Home.TeamName);
    }
    if (gameState.Guest.TeamName.trim() === 'Guest') {
      setGuestTN(i18next.t('Scoreboard.Guest'));
      console.log(gameState.Guest.TeamName);
    } else {
      setGuestTN(gameState.Guest.TeamName);
    }
  }
  
  useEffect(() => {
    gameState.Home.TeamName = homeTN;
    gameState.Guest.TeamName = guestTN;
    setSport(gameState.Display);
    console.log(gameState);

    updateTeamNames(gameState);

  }, [gameState]);


  const CurrentSportComponent =
    SPORT_COMPONENT_MAP[sport] ||
    (() => (
      <div style={{ backgroundColor: "black", color: "white" }}>
        {console.log("No sport component found for", sport)}
      </div>
    ));

  return (
    <>
      <CurrentSportComponent gameState={gameState} />
    </>
  );
};

export default ScoringMode;
