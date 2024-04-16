import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import ScoringMode from "./Components/ScoringMode"; 
import MediaMode from "./Components/MediaMode";
import PrematchMode from "./Components/PrematchMode";
import config from "./config";
import LogoMode from "./Components/LogoMode";
import "./main.css";
import TestPage from "./Components/TestPage";
import modeService from "./service/modeService";
const { ipcRenderer } = window.require("electron"); 

const root = document.getElementById("root");
const appRoot = ReactDOM.createRoot(root);

const App = () => {
  const [mode, setMode] = useState("");
  const [gameState, setGameState] = useState({});
  const [mediaState, setMediaState] = useState([]);
  const [mediaMode, setMediaMode] = useState(false);
  const [test, setTest] = useState(false);
  const [switchToScore, setSwitchToScore] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      modeService.getMode().then((data) => {
        setTest(data.mode);
      });
    }, 10000); // Check for mode changes every 10 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  useEffect(() => {
    ipcRenderer.on("server-data", (event, data) => {
      console.log('Received gameState:', data);
      switch(data.Mode) {
        case 9:
          setMode("scoring");
          setGameState(data);
          break;
        case 21:
          setMode("prematch");
          setGameState(data);
          break;
        case 22:
          setMode("logo");
          break;
        case 23:
          setMode("sleep");
          break;
        default:
          setMediaMode(true);
          setMode("media");
          const mediaArray = Array.isArray(data.medias) ? data.medias : [data.medias];
          setMediaState(mediaArray);
      }
    });

    ipcRenderer.on("message", (event, message) => {
      console.log("Received message:", message);
    });

    return () => {
      ipcRenderer.removeAllListeners("server-data");
    };
  }, []);

  return (
    <>
      {test === "test" ? (
        <TestPage />
      ) : (
        <>
          {mode === "scoring" && <ScoringMode gameState={gameState} />}
          {mode === "media" && <MediaMode mediaState={mediaState} mediaMode={mediaMode} />}
          {mode === "prematch" && (switchToScore ? <ScoringMode gameState={gameState} /> : <PrematchMode mediaState={mediaState} mediaMode={mediaMode} gameState={gameState} setSwitchToScore={setSwitchToScore} />)}
          {mode === "logo" && <LogoMode />}
          {mode === "sleep" && <></>}
          {mode === "" && <div>Waiting for data...</div>}
        </>
      )}
    </>
  );
};

appRoot.render(<App />);
