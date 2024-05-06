import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import ScoringMode from "./Components/ScoringMode";
import MediaMode from "./Components/MediaMode";
import PrematchMode from "./Components/PrematchMode.js";
import config from "./config.js";
import LogoMode from "./Components/LogoMode";
import "./main.css"
<<<<<<< HEAD
import i18n from "./config/i18n/i18n.js";
=======
import "./Components/Sports/globalSport.css";
>>>>>>> 093ae98 (Mise à jour du composant MediaMode.js pour ajouter une ligne vide)
import Basketball from "./Components/Sports/Basketball/Basketball.js";
import Handball from "./Components/Sports/Handball/Handball.js";
import Volleyball from "./Components/Sports/Volleyball/Volleyball.js";
import Tennis from "./Components/Sports/Tennis/Tennis.js";
import TestPage from "./Components/TestPage.js";
import modeService from "./service/modeService.js";
<<<<<<< HEAD
import { I18nextProvider } from "react-i18next";
const { ipcRenderer } = window.require("electron");
=======
/* const { ipcRenderer } = window.require("electron");  */
>>>>>>> 093ae98 (Mise à jour du composant MediaMode.js pour ajouter une ligne vide)

const root = document.getElementById("root");
const appRoot = ReactDOM.createRoot(root);
const App = () => {
  const [mode, setMode] = useState("");
  const [gameState, setGameState] = useState({});
  const [mediaState, setMediaState] = useState([]);
  const [mediaMode, setMediaMode] = useState(false);
  const [mediaKey, setMediaKey] = useState(0); // Key to force re-render of MediaMode
  const [lastMediaMode, setLastMediaMode] = useState(null); // Track last media mode

<<<<<<< HEAD
  useEffect(() => {
    const removeListeners = () => {
      ipcRenderer.removeAllListeners("server-data");
    };

    ipcRenderer.on("server-data", (event, data) => {
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
        {mode === "sleep" && <></>}
        {mode === "" && <div>Waiting for data...</div>}
      </I18nextProvider>
=======
  /*  useEffect(() => {
     const intervalId = setInterval(() => {
       modeService.getMode().then((data) => {
 
         setTest(data.mode);
       });
     }, 10000); // 10000 ms = 10 seconds
 
     // Clear the interval when the component is unmounted
     return () => clearInterval(intervalId);
   }, []); // Empty dependency array means this effect runs only once on mount
  */


  /* 
     useEffect(() => {
      document.documentElement.style.setProperty(
        "--maxWidth",
        config.display.width
      );
      document.documentElement.style.setProperty(
        "--maxHeight",
        config.display.height
      );
      console.log("App mounted");
      ipcRenderer.on("server-data", (event, data) => {
        console.log('!Received gameState', data, event);
        if (data.Mode === 9) {
          setMode("scoring");
          setGameState(data || {}); // Assuming the data for scoring mode contains a 'gameState' property
        }
          else if (data.Mode === 21) {
            console.log("mode is prematch:", data)
            setMode("prematch");
            const mediaArray = Array.isArray(data.medias)
                ? data.medias
                : [data.medias];
              console.log(mediaArray);
              setGameState(data.gameState);
        
        } else if (data.Mode === 22) {
          setMode("logo");
        } else if (data.Mode === 23) {
          setMode("sleep")
        } else {
          let mediaArray = [];
          setMediaMode(true);
              mediaArray = Array.isArray(data.medias)
                ? data.medias
                : [data.medias];
              console.log(mediaArray);
          setMode("media");
          // if data.medias is not an array, wrap it in one
          switch (data.Mode) {
          //   case 0:
          //     mediaArray = [
          //       {
          //         order: 1,
          //         path: "/medias/English/_DEFENCE.mp4",
          //         duration: 5,
          //         type: "video",
          //       },
          //     ];
          //     break;
          //   case 1:
          //     mediaArray = [
          //       {
          //         order: 1,
          //         path: "/medias/English/_DUNK.mp4",
          //         duration: 3,
          //         type: "video",
          //       },
          //     ];
          //     break;
          //   case 2:
          //     mediaArray = [
          //       {
          //         order: 1,
          //         path: "/medias/English/_NOISE.mp4",
          //         duration: 6,
          //         type: "video",
          //       },
          //     ];
          //     break;
          //   case 16:
          //     mediaArray = [
          //       {
          //         order: 1,
          //         path: "/medias/English/_1_POINTS.mp4",
          //         duration: 3,
          //         type: "video",
          //       },
          //     ];
          //     break;
          //   case 17:
          //     mediaArray = [
          //       {
          //         order: 1,
          //         path: "/medias/English/_2_POINTS.mp4",
          //         duration: 3,
          //         type: "video",
          //       },
          //     ];
          //     break;
          //   case 18:
          //     mediaArray = [
          //       {
          //         order: 1,
          //         path: "/medias/English/_3_POINTS.mp4",
          //         duration: 4,
          //         type: "video",
          //       },
          //     ];
          //     break;
          //   case 19:
          //     mediaArray = [
          //       {
          //         order: 1,
          //         path: "/medias/English/_TIME_OUT.mp4",
          //         duration: 3,
          //         type: "video",
          //       },
          //     ];
          //     break;
          //   case 20:
          //     mediaArray = [
          //       {
          //         order: 1,
          //         path: "/medias/English/_FOUL.mp4",
          //         duration: 3,
          //         type: "video",
          //       },
          //     ];
          //     break;
            default:
              setMediaMode(true);
              mediaArray = Array.isArray(data.medias)
                ? data.medias
                : [data.medias];
              console.log(mediaArray);
          }
          console.log(mediaArray);
          setMediaState(mediaArray);
        }
      });
  
      ipcRenderer.on("message", (event, message) => {
        console.log("Received message:", message);
      });
  
      return () => {
        ipcRenderer.removeAllListeners("server-data");
      };
    }, []);  */

  return (
    <>

      {/*   <Basketball /> */}
      {/*  <Handball /> */}
      <Volleyball />
      {/* <Tennis /> */}
>>>>>>> 093ae98 (Mise à jour du composant MediaMode.js pour ajouter une ligne vide)
    </>
  );
};

appRoot.render(<App />);
