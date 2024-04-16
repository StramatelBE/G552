import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import ScoringMode from "./Components/ScoringMode"; 
import MediaMode from "./Components/MediaMode";
import config from "./config.js";
import LogoMode from "./Components/LogoMode";
import "./main.css"
import Basketball from "./Components/Sports/Basketball/Basketball.js";
import Handball from "./Components/Sports/Handball/Handball.js";
import Volleyball from "./Components/Sports/Volleyball/Volleyball.js";
import Tennis from "./Components/Sports/Tennis/Tennis.js";
import TestPage from "./Components/TestPage.js";
import modeService from "./service/modeService.js";
const { ipcRenderer } = window.require("electron"); 

const root = document.getElementById("root");
const appRoot = ReactDOM.createRoot(root);

const App = () => {
  const [mode, setMode] = useState(""); // initialized to 'scoring'
  const [gameState, setGameState] = useState({});
  const [mediaState, setMediaState] = useState([]);
  const [mediaMode, setMediaMode] = useState(false);
  const [test, setTest] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      modeService.getMode().then((data) => {

        setTest(data.mode);
      });
    }, 10000); // 10000 ms = 10 seconds

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs only once on mount




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
  }, []); 

  return (
    <>
      {test === "test" ? (
        <TestPage />
      ) : (
        <>
          {mode === "scoring" && <ScoringMode gameState={gameState} />}
          {mode === "media" && <MediaMode mediaState={mediaState} mediaMode={mediaMode} gameState={gameState} />}
          {mode === "logo" && <LogoMode />}
          {mode === "sleep" && <></>}
          {mode === "" && <div>Waiting for data...</div>}
          {test === "test" && <TestPage />}
        </>
      )}
      {/* <Basketball /> */}
      {/* <Handball /> */}
      {/* <Volleyball /> */}
      {/* <Tennis /> */}
    </>
  );
};
appRoot.render(<App />);
