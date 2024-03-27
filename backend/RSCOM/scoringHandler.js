const MacroController = require("../Controllers/macroController");
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

        const scoreMode = [9];
        const immediateModes = [0, 1, 2, 16, 17, 18, 19, 20];
        const macroModes = [3, 4, 5, 6, 7, 8, 21];
        const stopModes = [22, 23];

        // console.log("Handle Scoring:", scoring.Mode)

        const handleImmediateMode = (mode) => {
            unixSocketSetup.sendData(scoring);
            previousMacrosDataMode = mode;
        };

        const handleMacroMode = async (mode) => {
            let macrosData = null;
            if (mode === 21) {
                macrosData = await macro.getMacrosByButton(15);
            } else {
                macrosData = await macro.getMacrosByButton(mode);
            }
            console.log("macrosData", macrosData)
            if (scoreMode.includes(macrosData)) {
                console.log("No event for this macro, sending Mode", scoring.Mode);
                scoring.Mode = scoreMode[0];
                unixSocketSetup.sendData(scoring);
            } else if (macrosData && macrosData[0]) {
                macrosData[0].Mode = mode;
                previousMacrosDataMode = mode; // Update the cache
                unixSocketSetup.sendMedia(macrosData[0]);
            } else {
                console.log("No event for this macro, sending Mode", scoring.Mode);
                scoring.Mode = scoreMode;
                unixSocketSetup.sendData(scoring);
            }
        };

        // console.log("Scoring Mode:", scoring.Mode);

        if (scoreMode.includes(scoring.Mode)){
            unixSocketSetup.sendData(scoring);
            previousMacrosDataMode = scoring.Mode;
        } else if (stopModes.includes(scoring.Mode)) {
            let stop = {};
            stop.Mode = scoring.Mode;
            unixSocketSetup.sendData(stop);
        } else if (immediateModes.includes(scoring.Mode)) {
            handleImmediateMode(scoring.Mode);
        } else if (macroModes.includes(scoring.Mode)) {
            await handleMacroMode(scoring.Mode);
        }

    } catch (error) {
        console.error("Error fetching macros:", error.message);
        scoring.Mode = 9;
        unixSocketSetup.sendData(scoring);
    }
};

module.exports = handleScoring;
