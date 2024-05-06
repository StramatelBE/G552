const Game = require("../RSCOM/Game.js");
const handleScoring = require("../RSCOM/scoringHandler.js");
const unixSocketSetup = require("../Sockets/Unixsocket.js");

const setupEventHandlers = (sharedEmitter) => {
    sharedEmitter.on("data", (data) => {
        Game.update(data);
    });

    sharedEmitter.on("scoring", handleScoring);

    sharedEmitter.on("media", (media) => {
        unixSocketSetup.sendMedia(media);
    });
};

module.exports = setupEventHandlers;
