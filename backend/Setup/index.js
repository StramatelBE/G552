const setupExpress = require("./expressSetup");
const setupSockets = require("./socketsSetup");
const setupRoutes = require("./routesSetup");
const setupMiddlewares = require("./middlewaresSetup");


module.exports = {
    setupExpress,
    setupSockets,
    setupRoutes,
    setupMiddlewares,

};
