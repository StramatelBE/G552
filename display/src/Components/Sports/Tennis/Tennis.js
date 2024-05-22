import React, { useEffect } from "react";
import "./Tennis.css";

function Tennis({ gameState: incomingGameState }) {
  const gameState = incomingGameState || {};

  const [homeFontSize, setHomeFontSize] = React.useState("30px");
  const [guestFontSize, setGuestFontSize] = React.useState("30px");
  const [currentSet, setCurrentSet] = React.useState(1);
  const [homePointsSet5, setHomePointsSet5] = React.useState(0);
  const [guestPointsSet5, setGuestPointsSet5] = React.useState(0);

  // Handle special scoring when points reach 99
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
    const totalSets = homeSetsWon + guestSetsWon + 1;
    return gameState?.Home?.Winner || gameState?.Guest?.Winner
      ? totalSets - 1
      : totalSets > 5
        ? 5
        : totalSets;
  }

  useEffect(() => {
    setCurrentSet(calculateCurrentSet(gameState?.Home?.SetsWon, gameState?.Guest?.SetsWon));
  }, [incomingGameState]);

  useEffect(() => {
    if (gameState?.Home?.Points === 6 || gameState?.Guest?.Points === 6) {
      setHomePointsSet5(gameState?.Home?.Points);
      setGuestPointsSet5(gameState?.Guest?.Points);
    }
  }, [gameState]);

  function getFontSize(name) {
    if (name.length <= 7) {
      return "30px"; // Taille normale
    } else if (name.length <= 9) {
      return "26px"; // Toujours un peu plus petit
    }
  }

  function getFontSizeScore(point) {
    return "35px";
  }

  // Determine the color of the service dot for Home and Guest
  const homeServiceDotColor = gameState?.Home?.Service === 1 ? "red" : "#005239";
  const guestServiceDotColor = gameState?.Guest?.Service === 1 ? "red" : "#005239";

  // Conditionally apply blinking class
  const homeBlinkClass = gameState?.Home?.Winner ? "blinking" : "";
  const guestBlinkClass = gameState?.Guest?.Winner ? "blinking" : "";

  const renderSetScores = (pointsInSet, pointsSet5) => {
    const sets = [0, 1, 2].map((set, index) => (
      <td key={index} className="set-cell">
        <div style={{ fontSize: getFontSizeScore(pointsInSet[set] || 0) }} className="set-score">
          {pointsInSet[set] !== undefined ? pointsInSet[set] : "0"}
        </div>
      </td>
    ));
    if (currentSet > 4 || (currentSet === 4 && (gameState?.Home?.Winner || gameState?.Guest?.Winner))) {
      sets.push(
        <td key={3} className="set-cell">
          <div style={{ fontSize: getFontSizeScore(pointsInSet[3] || 0) }} className="set-score">
            {pointsInSet[3] !== undefined ? pointsInSet[3] : "0"}
          </div>
        </td>
      );
    }
    if (currentSet === 5 && (gameState?.Home?.Winner || gameState?.Guest?.Winner)) {
      sets.push(
        <td key={4} className="set-cell">
          <div style={{ fontSize: getFontSizeScore(pointsSet5) }} className="set-score">
            {pointsSet5}
          </div>
        </td>
      );
    }
    return sets;
  };

  const renderSetHeaders = () => {
    const headers = ["S1", "S2", "S3"].map((set, index) => (
      <td key={index} className="set-cell">
        <div className="set-text">{set}</div>
      </td>
    ));
    if (currentSet > 4 || (currentSet === 4 && (gameState?.Home?.Winner || gameState?.Guest?.Winner))) {
      headers.push(
        <td key={3} className="set-cell">
          <div className="set-text">S4</div>
        </td>
      );
    }
    if (currentSet === 5 && (gameState?.Home?.Winner || gameState?.Guest?.Winner)) {
      headers.push(
        <td key={4} className="set-cell">
          <div className="set-text">S5</div>
        </td>
      );
    }
    return headers;
  };

  return (
    <div className="scoreboard">
      <div className="container-tennis">
        <div className="timer">{gameState?.Timer?.Value || "00:00"}</div>
        <table className="score-tennis">
          <tbody>
            <tr>
              {gameState?.Sport === "Tennis" &&
                <td>
                  <div className="set-score">{gameState?.Home?.GameInSet || "0"}</div>
                </td>
              }
              <td>
                <div className="set-score point score">{gameState?.Home?.Points || "0"}</div>
              </td>
              <td>
                <div className="dot" style={{ backgroundColor: `${homeServiceDotColor}` }}></div>
              </td>
              <td className="player-back">
                <div className={`player-name ${homeBlinkClass}`} style={{ fontSize: homeFontSize }}>
                  {gameState?.Home?.TeamName || "player1"}
                </div>
              </td>
              {gameState?.Sport === "Tennis" ?
                renderSetScores(gameState?.Home?.PointsInSet, gameState?.Home?.GameInSet)
                :
                renderSetScores(gameState?.Home?.PointsInSet, gameState?.Home?.Points)
              }
            </tr>
            <tr className="tr-text">
              {gameState?.Sport === "Tennis" &&

                <td>
                  <div className="set-text">S{currentSet || "1"}</div>
                </td>
              }
              {gameState?.Sport === "Tennis" ?
                <td>
                  <div className="set-text point">PTS</div>
                </td>
                :
                <td>
                  <div className="set-text point">S{currentSet || "1"}</div>
                </td>

              }
              <td>
                <div className="dot"></div>
              </td>
              <td className="player-back logo-tennis">
                <img src="LOGO_Stramatel.gif" />
              </td>
              {renderSetHeaders()}
            </tr>
            <tr>
              {gameState?.Sport === "Tennis" &&
                <td>
                  <div className="set-score">{gameState?.Guest?.GameInSet || "0"}</div>
                </td>
              }
              <td>
                <div className="set-score point score">{gameState?.Guest?.Points || "0"}</div>
              </td>
              <td>
                <div className="dot" style={{ backgroundColor: `${guestServiceDotColor}` }}></div>
              </td>
              <td className="player-back">
                <div className={`player-name ${guestBlinkClass}`} style={{ fontSize: guestFontSize }}>
                  {gameState?.Guest?.TeamName || "player2"}
                </div>
              </td>
              {gameState?.Sport === "Tennis" ?
                renderSetScores(gameState?.Guest?.PointsInSet, gameState?.Guest?.GameInSet)
                :
                renderSetScores(gameState?.Guest?.PointsInSet, gameState?.Guest?.Points)
              }

            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tennis;
