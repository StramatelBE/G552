import React from 'react';

function Handball({ gameState: incomingGameState }) {
  const containerStyle = {
    width: "100%",
    height: "100%",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const homeScoreStyle = {
    width: "226px",
    height: "100px",
    left: "0px",
    top: "0px",
    position: "absolute",
    textAlign: "center",
    color: "#FF0000",
    fontSize: "100px",
    fontFamily: '"D-DIN-Bold"',
    fontWeight: "700",
    wordWrap: "break-word",
  };

  const homeNameStyle = {
    width: "226px",
    height: "100px",
    left: "0px",
    top: "83px",
    position: "absolute",
    textAlign: "center",
    color: "white",
    fontSize: "45px",
    fontFamily: '"D-DIN-Bold"',
    fontWeight: "700",
    wordWrap: "break-word",
  };

  const homeTimeoutStyle = {
    width: "15px",
    height: "15px",
    left: "100px",
    position: "absolute",
    background: "#00A13B",
    borderRadius: "9999px",
  };

  const homeFoulsStyle = {
    width: "25px",
    height: "46px",
    left: "31px",
    top: "195px",
    position: "absolute",
    textAlign: "center",
    color: "#EBFF00",
    fontSize: "50px",
    fontFamily: '"D-DIN-Bold"',
    fontWeight: "700",
    wordWrap: "break-word",
  };

  const homePossessionStyle = {
    clipPath: "polygon(100% 0%, 82.4% 49.5%, 100% 100%, 0% 50%)",
    background: "#ff0000",
    height: "20px",
    width: "20px",
    left: "203px",
    top: "40px",
    position: "absolute",
  };

  const periodStyle = {
    width: "26px",
    height: "64px",
    left: "243px",
    top: "18px",
    position: "absolute",
    color: "#00A13B",
    fontSize: "60px",
    fontFamily: '"D-DIN-Bold"',
    fontWeight: "700",
    wordWrap: "break-word",
  };

  const timerStyle = {
    width: "250px",
    height: "76px",
    left: "137px",
    top: "134px",
    position: "absolute",
    textAlign: "center",
    color: "white",
    fontSize: "95px",
    fontFamily: '"D-DIN-Bold"',
    wordWrap: "break-word",
  };

  const guestNameStyle = {
    width: "226px",
    height: "56px",
    left: "286px",
    top: "85px",
    position: "absolute",
    textAlign: "center",
    color: "white",
    fontSize: "45px",
    fontFamily: '"D-DIN-Bold"',
    fontWeight: "700",
    wordWrap: "break-word",
  };

  const guestScoreStyle = {
    width: "226px",
    height: "100px",
    left: "286px",
    top: "0px",
    position: "absolute",
    textAlign: "center",
    color: "#FF0000",
    fontSize: "100px",
    fontFamily: '"D-DIN-Bold"',
    fontWeight: "700",
    wordWrap: "break-word",
  };
  const guestTimeoutStyle = {
    width: "15px",
    height: "15px",
    left: "398px",
    position: 'absolute'
  };

  const guestFoulsStyle = {
    width: "25px",
    height: "46px",
    left: "456px",
    top: "195px",
    position: "absolute",
    textAlign: "center",
    color: "#EBFF00",
    fontSize: "50px",
    fontFamily: '"D-DIN-Bold"',
    fontWeight: "700",
    wordWrap: "break-word",
  };

  const guestPossessionStyle = {
    clipPath: "polygon(0% 0%, 100% 50%, 0% 100%, 25% 50%)",
    background: "#ff0000",
    height: "20px",
    width: "20px",
    left: "293px",
    top: "40px",
    position: "absolute",
  };

  const imageStyle = {
    width: "130px",
    height: "21px",
    left: "191px",
    top: "230px",
    position: "absolute",
  };

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


  const gameState = incomingGameState || {};
  const showHomeTimeout = gameState?.Home?.Timeout?.Time !== "0:00";
  const showGuestTimeout = gameState?.Guest?.Timeout?.Time !== "0:00";

  return (
    <div style={containerStyle}>
      <div style={homeScoreStyle}>
        {gameState?.Home?.Points || "0"} {/* team score */}
      </div>
      <div style={homeNameStyle}>
        {gameState?.Home?.TeamName || "HOME"} {/* team name HOME */}
      </div>

      {gameState?.Home?.Timeout?.Team > 0 && (
        <>
          {[...Array(gameState?.Home?.Timeout?.Team || 3)].map((_, i) => {
            const top = 139 + i * 20 + i * 10; // 10px de marge entre les timeouts
            return (
              <div
                key={i}
                style={{
                  width: "15px",
                  height: "15px",
                  left: `${100 + i * 25}px`,
                  top: `170px`,
                  position: "absolute",
                  background: "#00A13B",
                  borderRadius: "9999px",
                }}
              />
            );
          })}
        </>
      )}{/* team HOME time out */}

      <div style={homeFoulsStyle}>
        {gameState?.Home?.Fouls?.Team} {/* team HOME fouls */}
      </div>
      {gameState?.Home?.Possession && (
        <div style={homePossessionStyle}></div>
      )}

      <div style={periodStyle}>
        {gameState?.Period || "0"} {/* period */}
      </div>
      {gameState?.Guest?.Possession && (
        <div style={guestPossessionStyle}></div>
      )}
      <div style={timerStyle}>
        {formatTimer(
          gameState?.Timer?.Value || "00:00",
          showHomeTimeout,
          showGuestTimeout
        )}
      </div>
      <div style={guestNameStyle}>
        {gameState?.Guest?.TeamName || "GUEST"} {/* team name GUEST */}
      </div> <div style={guestScoreStyle}> {gameState?.Guest?.Points || "0"} {/* team score */} </div>
      {(
        <>

          {[...Array(gameState?.Guest?.Timeout?.Team || 0)].map((_, i) => (
            <div
              key={i}
              style={{
                width: "15px",
                height: "15px",
                left: `${398 + i * 25}px`,
                top: `170px`,
                position: "absolute",
                background: "#00A13B",
                borderRadius: "9999px",
              }}
            />
          ))}
        </>
      )}{/* team GUEST time out */}

      <div style={guestFoulsStyle}> {gameState?.Guest?.Fouls?.Team} {/* team GUEST fouls */}
      </div>
      <img style={imageStyle} src="LOGO_Stramatel.gif" />
    </div>);
};
export default Handball;