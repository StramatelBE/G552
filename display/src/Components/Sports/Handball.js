import React from "react";

function Handball({ gameState: incomingGameState }) {
  // Default gameState to prevent null/undefined errors
  const gameState = incomingGameState || {
    Home: {
      Points: "0",
      TeamName: "HOME",
      Timeout: { Team: 0, Time: "0:00" },
      Fouls: { Team: 0 },
      Possession: false,
    },
    Guest: {
      Points: "0",
      TeamName: "GUEST",
      Timeout: { Team: 0, Time: "0:00" },
      Fouls: { Team: 0 },
      Possession: false,
    },
    Timer: { Value: "00:00" },
    Period: "0",
  };

  // Function to format the timer, including handling of timeout timers
  function formatTimer(timerString, showHomeTimeout, showGuestTimeout) {
    if (!timerString) {
      return [];
    }

    timerString = timerString.toString();
    const characters = timerString.slice(0, 5).split("");

    while (characters.length < 5) {
      characters.push("");
    }

    if (characters[0] === "0" && characters[1] === ":") {
      characters.unshift("\u00A0");
    }

    const homeTimeout = gameState.Home.Timeout.Time || "0:00";
    const guestTimeout = gameState.Guest.Timeout.Time || "0:00";

    if (showHomeTimeout && homeTimeout !== "0:00") {
      return formatTimer(homeTimeout);
    }

    if (showGuestTimeout && guestTimeout !== "0:00") {
      return formatTimer(guestTimeout);
    }

    return characters.map((char, index) => (
      <span
        key={index}
        style={{
          fontFamily: "D-DIN-Bold",
          display: "inline-block",
          width: "45px",
          textAlign: "center",
          ...(index === 2 && { paddingBottom: "5px" }),
        }}
      >
        {char}
      </span>
    ));
  }

  const showHomeTimeout = gameState.Home.Timeout.Time !== "0:00";
  const showGuestTimeout = gameState.Guest.Timeout.Time !== "0:00";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        background: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "240px",
          height: "80px",
          left: "136px",
          top: "134px",
          position: "absolute",
          textAlign: "center",
          color: "white",
          fontSize: "100px",
          fontFamily: '"D-DIN-Bold"',
          fontWeight: "700",
          wordWrap: "break-word",
        }}
      >
        {formatTimer(gameState.Timer.Value, showHomeTimeout, showGuestTimeout)}
      </div>
      <img
        style={{
          width: "130px",
          height: "21px",
          left: "191px",
          top: "224px",
          position: "absolute",
        }}
        src="LOGO_Stramatel.gif"
      />
      {/* Implementing dynamic content based on gameState */}
      {/* Home team section */}
      <div
        style={{
          width: "170px",
          height: "250px",
          left: "0px",
          top: "0px",
          position: "absolute",
        }}
      >
        {gameState.Home.Possession && (
          <div
            style={{
              width: "20px",
              height: "20px",
              left: "75px",
              top: "50px",
              position: "absolute",
              background: "#ff0000",
              borderRadius: "9999px",
            }}
          ></div>
        )}
        <div
          style={{
            width: "93px",
            height: "46px",
            left: "39px",
            top: "204px",
            position: "absolute",
            textAlign: "center",
            color: "#EBFF00",
            fontSize: "48px",
            fontFamily: '"D-DIN-Bold"',
            fontWeight: "700",
            wordWrap: "break-word",
          }}
        >
          {gameState.Home.Timeout.Time}
        </div>
        <div
          style={{
            width: "50px",
            height: "100px",
            left: "61px",
            top: "0px",
            position: "absolute",
            color: "#FF0000",
            fontSize: "100px",
            fontFamily: '"D-DIN-Bold"',
            fontWeight: "700",
            wordWrap: "break-word",
          }}
        >
          {gameState.Home.Points}
        </div>
        <div
          style={{
            width: "170px",
            height: "60px",
            left: "0px",
            top: "90px",
            position: "absolute",
            textAlign: "center",
            color: "white",
            fontSize: "45px",
            fontFamily: '"D-DIN-Bold"',
            fontWeight: "700",
            wordWrap: "break-word",
          }}
        >
          {gameState.Home.TeamName}
        </div>
      </div>
      {/* Guest team section */}
      <div
        style={{
          width: "170px",
          height: "250px",
          left: "342px",
          top: "0px",
          position: "absolute",
        }}
      >
        {gameState.Guest.Possession && (
          <div
            style={{
              width: "20px",
              height: "20px",
              left: "75px",
              top: "50px",
              position: "absolute",
              background: "#ff0000",
              borderRadius: "9999px",
            }}
          ></div>
        )}
        <div
          style={{
            width: "93px",
            height: "46px",
            left: "39px",
            top: "204px",
            position: "absolute",
            textAlign: "center",
            color: "#EBFF00",
            fontSize: "48px",
            fontFamily: '"D-DIN-Bold"',
            fontWeight: "700",
            wordWrap: "break-word",
          }}
        >
          {gameState.Guest.Timeout.Time}
        </div>
        <div
          style={{
            width: "50px",
            height: "100px",
            left: "61px",
            top: "0px",
            position: "absolute",
            color: "#FF0000",
            fontSize: "100px",
            fontFamily: '"D-DIN-Bold"',
            fontWeight: "700",
            wordWrap: "break-word",
          }}
        >
          {gameState.Guest.Points}
        </div>
        <div
          style={{
            width: "170px",
            height: "60px",
            left: "0px",
            top: "90px",
            position: "absolute",
            textAlign: "center",
            color: "white",
            fontSize: "45px",
            fontFamily: '"D-DIN-Bold"',
            fontWeight: "700",
            wordWrap: "break-word",
          }}
        >
          {gameState.Guest.TeamName}
        </div>
      </div>
    </div>
  );
}

export default Handball;
