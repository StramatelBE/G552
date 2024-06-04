import React, { useState, useEffect, useRef } from "react";

import "./StandardDisplay.css";

const StandardDisplay = ({ gameState: incomingGameState }) => {
  // Check for gameState in localStorage
  const savedGameState = JSON.parse(localStorage.getItem("gameState"));
  const [gameState, setGameState] = useState(
    incomingGameState || savedGameState || {}
  );
  const [homeFontSize, setHomeFontSize] = useState(45); // taille de police initiale en pixels
  const teamNameRef = useRef(null); // référence pour accéder à l'élément du DOM

  const [guestFontSize, setGuestFontSize] = useState(45); // taille de police initiale en pixels pour l'équipe invitée
  const guestTeamNameRef = useRef(null); // référence pour accéder à l'élément du DOM pour l'équipe invitée

  useEffect(() => {
    // Cette fonction vérifie la largeur du texte et ajuste la taille de la police si nécessaire
    const adjustFontSize = () => {
      // Pour l'équipe à domicile

      if (homeTeamName.length > 8) {
        setHomeFontSize(35);
      } else if (homeTeamName.length > 6) {
        setHomeFontSize(40);
      } else {
        setHomeFontSize(45);
      }

      // Pour l'équipe invitée
      if (guestTeamName.length > 8) {
        setGuestFontSize(35);
      } else if (guestTeamName.length > 6) {
        setGuestFontSize(40);
      } else {
        setGuestFontSize(45);
      }
    };

    // Appeler la fonction lorsque le composant est monté
    adjustFontSize();
    // Si vous vous attendez à ce que la largeur change, vous pouvez ajouter des écouteurs d'événements ou utiliser un MutationObserver ici
  }, [incomingGameState]);

  useEffect(() => {
    // Store gameState in localStorage whenever it changes
    localStorage.setItem("gameState", JSON.stringify(gameState));
  }, [gameState]);

  useEffect(() => {
    // Update local gameState with incomingGameState if not null
    if (incomingGameState) {
      setGameState(incomingGameState);
    }
  }, [incomingGameState]);

  const formatScore = (timerString) => {
    // console.log('Input Score:', timerString);
    if (!timerString) {
      return 0;
    }
    timerString = timerString.toString();
    const formatted = timerString.split("").map((char, index) => (
      <span key={index} className="character">
        {char}
      </span>
    ));
    // console.log('Formatted Score:', formatted);
    return formatted;
  };


  const formatTimeoutsTimer = (timerString) => {
    // Récupère les 5 premiers caractères ou moins si la chaîne est plus courte.
    const characters = timerString.slice(0, 5).split("");

    // Vérifie s'il y a moins de 5 caractères et, le cas échéant, ajoute des espaces vides jusqu'à ce qu'il y en ait 5.
    while (characters.length < 4) {
      characters.push(" "); // ajoute un espace vide à la liste, qui sera rendu comme un span vide.
    }

    // Map sur les caractères et renvoie les spans, avec une classe différente pour l'index 2.
    return characters.map((char, index) => {
      const className =
        index === 1
          ? "characterTimeoutsTimer"
          : "characterTimeoutsTimerDifferent";
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  function formatTimer(timerString) {
    // Récupère les 5 premiers caractères ou moins si la chaîne est plus courte.
    // console.log(timerString);
    if (!timerString) {
      return []; // Return an empty array or handle this case as you see fit.
    }
    timerString = timerString.toString();
    const characters = timerString.slice(0, 5).split("");

    // Vérifie s'il y a moins de 5 caractères et, le cas échéant, ajoute des espaces vides jusqu'à ce qu'il y en ait 5.
    while (characters.length < 5) {
      characters.push(" "); // ajoute un espace vide à la liste, qui sera rendu comme un span vide.
    }

    // Map sur les caractères et renvoie les spans, avec une classe différente pour l'index 2.
    return characters.map((char, index) => {
      const className = index === 2 ? "character-different" : "character";
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  }

  const periodOrSet = gameState?.Period || gameState?.Set || "1";
  const timer =
    gameState?.Timer?.Value || savedGameState?.Timer?.Value || "00:00";
  const formattedTimer = formatTimer(timer);
  const homeTeamName =
    gameState?.Home?.TeamName || savedGameState?.Home?.TeamName || "HOME";

  const guestTeamName =
    gameState?.Guest?.TeamName || savedGameState?.Guest?.TeamName || "GUEST";
  const homeTeamScore = formatScore(
    gameState?.Home?.Points || savedGameState?.Home?.Points || "0"
  );
  const guestTeamScore = formatScore(
    gameState?.Guest?.Points || savedGameState?.Guest?.Points || "0"
  );
  const homeTeamTimeouts =
    gameState?.Home?.Timeout?.Count ||
    savedGameState?.Home?.Timeout?.Count ||
    "0";

  const guestTeamTimeouts =
    gameState?.Guest?.Timeout?.Count ||
    savedGameState?.Guest?.Timeout?.Count ||
    "0";

  const possessionHome =
    gameState?.Home?.Possession || savedGameState?.Home?.Possession || false;
  const possessionGuest =
    gameState?.Guest?.Possession || savedGameState?.Guest?.Possession || false;

  const homeTeamFouls =
    gameState?.Home?.Fouls?.Team?.toString() ||
    savedGameState?.Home?.Fouls?.Team?.toString() ||
    "0";

  const guestTeamFouls =
    gameState?.Guest?.Fouls?.Team?.toString() ||
    savedGameState?.Guest?.Fouls?.Team?.toString() ||
    "0";

  const TimeoutsTimer = formatTimeoutsTimer(
    gameState?.Home?.Timeout?.Time ||
    savedGameState?.Home?.Timeout?.Time ||
    "0:00"
  );

  const TimeoutsTimerString =
    gameState?.Home?.Timeout?.Time ||
    savedGameState?.Home?.Timeout?.Time ||
    "0:00";

  return (
    <div className="scoreboard">
      <div className="team-display home">
        <span className="team-score-display">{homeTeamScore}</span>
        <div className="team-name-display-left">
          <span
            className="team-name-display"
            ref={teamNameRef}
            style={{ fontSize: `${homeFontSize}px` }}
          >
            {homeTeamName}
          </span>
        </div>

        <div className=" timeout-display">
          {[...Array(3)].map((_, i) => {
            return i < homeTeamTimeouts ? (
              <div className="circleIcon filled" key={i}></div>
            ) : (
              <div className="circleIcon " key={i}></div>
            );
          })}
        </div>

        {TimeoutsTimerString === "0:00" ? (
          <div className="timeout team-fouls-left">
            <span className="timeout-texte">{homeTeamFouls}</span>
          </div>
        ) : (
          <div className="timeout">
            <span className=" timeout-texte">{TimeoutsTimer}</span>
          </div>
        )}
      </div>

      <div className="middle-section">
        <div className="period">
          {possessionHome === true ? (
            <div className="arrow-icon-left"></div>
          ) : (
            <div className="arrow-icon-left hidden"></div>
          )}

          <span className="period-number">{periodOrSet}</span>

          {possessionGuest ? (
            <div className="arrow-icon-right"></div>
          ) : (
            <div className="arrow-icon-right hidden"></div>
          )}
        </div>
        <div className="time-logo">
          {/*   <img
            className="logo-fiba"
            style={{ visibility: "hidden" }}
            src="images/fiba.png"
            alt="logo"
          /> */}
          <div className="timer">{formattedTimer}</div>
          {/*    <img className="logo-fiba" src="images/fiba.png" alt="logo" /> */}
        </div>
        <img
          className="logo"
          src="images/_Stramatel_Logo_FR_2.gif"
          alt="logo"
        />
      </div>

      <div className="team-display guest">
        <span className="team-score-display team-score-right">
          {guestTeamScore}
        </span>
        <div className="team-name-display-right">
          <span
            className="team-name-display team-name-right"
            ref={guestTeamNameRef}
            style={{ fontSize: `${guestFontSize}px` }}
          >
            {guestTeamName}
          </span>
        </div>
        <div className="timeout-display">
          {[...Array(3)].map((_, i) => {
            return i < guestTeamTimeouts ? (
              <div className="circleIcon filled" key={i}></div>
            ) : (
              <div className="circleIcon " key={i}></div>
            );
          })}
        </div>
        <div className="timeout">
          {TimeoutsTimerString === "0:00" ? (
            <div className="timeout team-fouls-right ">
              <span className="timeout-texte">{guestTeamFouls}</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default StandardDisplay;
