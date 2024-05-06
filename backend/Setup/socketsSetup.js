const webSocketSetup = require("../Sockets/Websocket.js");
const unixSocketSetup = require("../Sockets/Unixsocket.js");

const setupSockets = (app) => {
    webSocketSetup(app);

    // Start unix socket server only if the environment is linux
 
    const currentOS = process.platform;
    if (currentOS === "linux") {
        unixSocketSetup.startServer();
    }
};

module.exports = setupSockets;
