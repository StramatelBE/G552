import React, { useEffect, useState } from "react";

import Basketball from "./Sports/Basketball/Basketball"
import Handball from "./Sports/Handball/Handball"
import Tennis from "./Sports/Tennis/Tennis"
import Volleyball from "./Sports/Volleyball/Volleyball"
import i18next from "i18next";

//TODO: DISPLAY TIMEOUT COUNTDOWN WHEN TIMEOUT IS CALLED

const SPORT_COMPONENT_MAP = {
  BasketBall: Basketball,
  HandBall: Handball,
  Tennis: Tennis,
  Volleyball: Volleyball,

};

  async function updateTeamNames(gameState) {
    // Set the language for i18next based on gameState
    await i18next.changeLanguage(gameState.Language);
  
    if (gameState.Home.TeamName.trim() === "") {
      gameState.Home.TeamName = i18next.t('Scoreboard.Home');
    }
    if (gameState.Guest.TeamName.trim() === "") {
      gameState.Guest.TeamName = i18next.t('Scoreboard.Guest');
    }
  }
  


const ScoringMode = ({ gameState }) => {
  const [sport, setSport] = useState("none");
  
  
  useEffect(() => {
    console.log(gameState);

    updateTeamNames(gameState);

  }, []);
  useEffect(() => {

    if (gameState && gameState.Display) {
      setSport(gameState.Display);
    }
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
