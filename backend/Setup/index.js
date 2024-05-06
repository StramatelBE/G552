const setupExpress = require("./expressSetup");
const setupEventHandlers = require("./eventHandlerSetup");
const setupSockets = require("./socketsSetup");
const setupRoutes = require("./routesSetup");
const setupMiddlewares = require("./middlewaresSetup");
const setupSerialPort = require("./serialPortSetup");
const setupQRCode = require("./qrcodeSetup");
const setupCronJobs = require("./cronJobsSetup");



module.exports = {
    Express: setupExpress,
    Sockets: setupSockets,
    Routes: setupRoutes,
    Middlewares: setupMiddlewares,
    SerialPorts: setupSerialPort,
    QRCode: setupQRCode,
    Cronjobs: setupCronJobs,
    EventHandlers: setupEventHandlers
};
