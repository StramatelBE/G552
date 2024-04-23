import React, { useEffect, useState } from "react";

import Basketball from "./Sports/Basketball/Basketball"
import Handball from "./Sports/Handball/Handball"
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
