import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import ScoringMode from "./Components/ScoringMode";
import MediaMode from "./Components/MediaMode";
import PrematchMode from "./Components/PrematchMode.js";
import QRMode from "./Components/QRMode.js";
import config from "./config.js";
import LogoMode from "./Components/LogoMode";
import "./main.css"
import i18n from "./config/i18n/i18n.js";
import Basketball from "./Components/Sports/Basketball/Basketball.js";
import Handball from "./Components/Sports/Handball/Handball.js";
import Volleyball from "./Components/Sports/Volleyball/Volleyball.js";
import Tennis from "./Components/Sports/Tennis/Tennis.js";
import TestPage from "./Components/TestPage.js";
import modeService from "./service/modeService.js";
import { I18nextProvider } from "react-i18next";
const { ipcRenderer } = window.require("electron");

const root = document.getElementById("root");
const appRoot = ReactDOM.createRoot(root);
const App = () => {
  const [mode, setMode] = useState("");
  const [gameState, setGameState] = useState({});
  const [mediaState, setMediaState] = useState([]);
  const [mediaMode, setMediaMode] = useState(false);
  const [mediaKey, setMediaKey] = useState(0); // Key to force re-render of MediaMode
  const [lastMediaMode, setLastMediaMode] = useState(null); // Track last media mode


  useEffect(() => {
    const removeListeners = () => {
      ipcRenderer.removeAllListeners("server-data");
    };

    ipcRenderer.on("server-data", (event, data) => {
      // console.log(data.Mode);
      switch (data.Mode) {
        case 0:
          setMode("scoring");
          setGameState(data || {});
          break;
        case 21:
          setMode("prematch");
          setGameState(data.gameState);
          setMediaState(Array.isArray(data.medias) ? data.medias : [data.medias]);
          break;
        case 22:
          setMode("logo");
          break;
        case 23:
          setMode("sleep");
          break;
        case 25:
          setMode("test");
          break;
        case 24:
          setMode("qr");
          break;
        default:
          if (data.Mode >= 1 && data.Mode <= 9) {
            if (lastMediaMode !== data.Mode) {
              setMediaKey(prevKey => prevKey + 1); // Increment key to force re-render only if mode changes
              setLastMediaMode(data.Mode); // Update last media mode
            }
            setMode("media");
            setMediaState(Array.isArray(data.medias) ? data.medias : [data.medias]);
            setMediaMode(true);
          }
          break;
      }
    });

    return removeListeners;
  }, [lastMediaMode]); // Include lastMediaMode in the dependencies array


  return (
    <>
      <I18nextProvider i18n={i18n}>
        {mode === "scoring" && <ScoringMode gameState={gameState} />}
        {mode === "media" && <MediaMode key={mediaKey} mediaState={mediaState} mediaMode={mediaMode} />}
        {mode === "prematch" && <PrematchMode mediaState={mediaState} mediaMode={mediaMode} gameState={gameState} />}
        {mode === "logo" && <LogoMode />}
        {mode === "test" && <TestPage />}
        {mode === "qr" && <QRMode />}
        {mode === "sleep" && <></>}
        {mode === "" && <div>Waiting for data...</div>}
      </I18nextProvider>
    </>
  );
};

appRoot.render(<App />);
