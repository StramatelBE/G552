const MacroController = require("../Controllers/macroController");
const User = require("../Models/userModel");
const unixSocketSetup = require("../Sockets/Unixsocket.js");

let previousMacrosDataMode = null;

/**
 * Handle the scoring data received from the RSCOM
 * @param scoring
 * @returns {Promise<void>}
 * @constructor handleScoring
 * @const scoreMode {number} - The scoring mode that indicates that the display should display the score {9}
 * @const immediateModes {number[]} - The modes that indicates that the display should display the static animations :
 * defence {0}, dunk {1}, noise {2}, 1 points {16}, 2 points {17}, 3 points {18}, timeout {19}, foul {20}
 * @const macroModes {number[]} - The modes that indicates that the display should display :
 * a macro defined by the user {3, 4, 5, 6, 7, 8} or the prematch macro {21}
 * @const stopModes {number[]} - The modes that indicates that the display should display :
 * the logo {22} or a black screen {23}
 **/


const handleScoring = async (scoring) => {
    try {
        const macro = new MacroController();
        const user = User.getInstance();

        const scoreMode = [0];
        const immediateModes = [16, 17, 18, 19, 20];
        const macroModes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const prematchMode = [21];
        const stopModes = [22, 23, 24, 25, 99];

        const getLanguage = await user.getLanguage(scoring.Sport);

        // console.log("Handle Scoring:", scoring.Mode)

        const handleImmediateMode = (mode) => {
            console.log("immediate mode");
            unixSocketSetup.sendData(scoring);
            previousMacrosDataMode = mode;
        };

        const handleMacroMode = async (mode, gameState) => {
            console.log("macro mode");

            console.log("Mode", mode);
            console.log("Sport", gameState.Sport);
            let macrosData = await macro.getMacrosByButton(mode, gameState.Sport);
            console.log("MacrosData", macrosData);

            //console.log("macrosData", macrosData)
            if (scoreMode.includes(macrosData)) {
                // console.log("No event for this macro, sending Mode", scoring.Mode);
                scoring.Mode = scoreMode[0];
                unixSocketSetup.sendData(scoring);
            } else if (macrosData && macrosData[0]) {
                macrosData[0].Mode = mode;
                previousMacrosDataMode = mode; // Update the cache
                unixSocketSetup.sendMedia(macrosData[0]);
            } else {
                // console.log("No event for this macro, sending Mode", scoring.Mode);
                scoring.Mode = scoreMode[0];
                unixSocketSetup.sendData(scoring);
            }
        };

        const handlePrematchMode = async (mode, gameState) => {
            console.log("macro mode");
            let macrosData = null;

            if (mode === 21) {
                macrosData = await macro.getMacrosByButton(15, gameState.Sport);
                // console.log(gameState);/
                let prematchData = {
                    mode: mode,
                    medias: macrosData[0].medias,
                    gameState: gameState
                }
                console.log("prematch");
                unixSocketSetup.sendPrematchData(prematchData);
            } else {
                macrosData = await macro.getMacrosByButton(mode, gameState.Sport);
            }
            //console.log("macrosData", macrosData)
            if (scoreMode.includes(macrosData)) {
                // console.log("No event for this macro, sending Mode", scoring.Mode);
                scoring.Mode = scoreMode[0];
                unixSocketSetup.sendData(scoring);
            } else if (macrosData && macrosData[0]) {
                macrosData[0].Mode = mode;
                previousMacrosDataMode = mode; // Update the cache
                unixSocketSetup.sendMedia(macrosData[0]);
            } else {
                // console.log("No event for this macro, sending Mode", scoring.Mode);
                scoring.Mode = scoreMode;
                unixSocketSetup.sendData(scoring);
            }
        };

        //console.log("Mode:", scoring.Mode);


        if (scoreMode.includes(scoring.Mode)) {
            console.log("score mode");
            scoring.Language = getLanguage.language;

            unixSocketSetup.sendData(scoring);
            previousMacrosDataMode = scoring.Mode;
        } else if (stopModes.includes(scoring.Mode)) {
            let stop = {};
            stop.Mode = scoring.Mode;
            unixSocketSetup.sendData(stop);
        } else if (immediateModes.includes(scoring.Mode)) {
            handleImmediateMode(scoring.Mode);
        } else if (macroModes.includes(scoring.Mode)) {
            await handleMacroMode(scoring.Mode, scoring);
        } else if (prematchMode.includes(scoring.Mode)) {
            await handlePrematchMode(scoring.Mode, scoring);
        }

    } catch (error) {
        console.error("Error fetching macros:", error.message);
        scoring.Mode = 0;
        unixSocketSetup.sendData(scoring);
    }
};

module.exports = handleScoring;
