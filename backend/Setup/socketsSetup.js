const webSocketSetup = require("../Sockets/Websocket.js");
const unixSocketSetup = require("../Sockets/Unixsocket.js");

const setupSockets = (app) => {
    webSocketSetup(app);
    unixSocketSetup.startServer();
};

module.exports = setupSockets;
