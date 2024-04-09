import React, { useEffect, useState } from "react";

import Basketball from "./Sports/Basketball"
import Handball from "./Sports/Handball"
import Tennis from "./Sports/Tennis/Tennis"
import Volleyball from "./Sports/Volleyball/Volleyball"

//TODO: DISPLAY TIMEOUT COUNTDOWN WHEN TIMEOUT IS CALLED

const SPORT_COMPONENT_MAP = {
  BasketBall: Basketball,
  HandBall: Handball,
  Tennis: Tennis,
  Volleyball: Volleyball,

};

const ScoringMode = ({ gameState }) => {
  const [sport, setSport] = useState("none");

  useEffect(() => {
    console.log(gameState);
  }, []);
  useEffect(() => {

    if (gameState && gameState.Sport) {
      setSport(gameState.Sport);
    }
  }, [gameState]);

  const CurrentSportComponent =
    SPORT_COMPONENT_MAP[sport] ||
    (() => (
      <div style={{ backgroundColor: "black", color: "white" }}>
        Waiting for data...ScoringMode
      </div>
    ));

  return (
    <>
      <CurrentSportComponent gameState={gameState} />
    </>
  );
};

export default ScoringMode;
