const express = require("express");
const db = require("./Database/db");
const app = express();
const config = require("./config");
const bodyParser = require("body-parser");
const cors = require("cors");
const checkToken = require("./Middlewares/signInCheck");
const Game = require("./RSCOM/Game");
const MacroController = require("./Controllers/macroController");
const handleScoring = require("./RSCOM/scoringHandler");
const cronJobs = require('./Cronjob/Cron_index');

const User = require('./Models/userModel');
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json({limit:'800mb'}));
app.use(bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
  }));

app.listen(config.portAPI, () => {
    console.log(`API Server started on ${config.ip}:${config.portAPI}`);
});

const webSocketSetup = require("./Sockets/Websocket.js");
webSocketSetup(app);
const unixSocketSetup = require("./Sockets/Unixsocket.js");
unixSocketSetup.startServer(); 

const {SerialPortConnection, sharedEmitter} = require("./RSCOM/SerialPorts/SerialPortConnection");
const sp = new SerialPortConnection();

sp.StartReading();
sharedEmitter.on("data", (data) => {
    Game.update(data);
});

cronJobs.startAllJobs();

sharedEmitter.on("scoring", handleScoring);

sharedEmitter.on("media", (media) => {
    unixSocketSetup.sendMedia(media);
});

const authRoutes = require("./Routes/authRoutes");
const activeSessionsRoutes = require("./Routes/activeSessionsRoutes");
const userRoutes = require("./Routes/userRoutes");
const spaceRoutes = require("./Routes/spaceRoutes");
const modeRoutes = require("./Routes/modeRoutes");
app.use("/activeSessions", activeSessionsRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/mode", modeRoutes);
app.use("/space", spaceRoutes);

app.use(checkToken);


const scoringRoutes = require("./Routes/scoringRoutes");
const mediaRoutes = require("./Routes/mediaRoutes");
const eventmediaRoutes = require("./Routes/eventmediaRoutes");
const eventRoutes = require("./Routes/eventRoutes");
const macroRoutes = require("./Routes/macroRoutes");
const buttonRoutes = require("./Routes/buttonRoutes");
const paramRoutes = require("./Routes/paramRoutes");
const veilleRoutes = require("./Routes/veilleRoutes");

const adminRoutes = require("./Routes/adminRoutes");

app.use("/scores", scoringRoutes);

app.use("/medias", mediaRoutes);
app.use("/events", eventRoutes);
app.use("/eventmedias", eventmediaRoutes);
app.use("/macros", macroRoutes);
app.use("/buttons", buttonRoutes);
app.use("/params", paramRoutes);
app.use("/veilles", veilleRoutes);

app.use("/admin", adminRoutes);

User.getInstance().createTable();
app.get("/", (req, res) => {
    res.send(`Le serveur fonctionne sur le port ${config.portAPI}`);
});


module.exports = app;

// const express = require("express");
// const app = express();
// const config = require("./config");
// require("dotenv").config();

// const { setupExpress, setupSockets, setupRoutes } = require("./Setup");

// setupExpress(app);
// setupSockets(app);
// setupRoutes(app);

// app.listen(config.portAPI, () => {
//     console.log(`API Server started on ${config.ip}:${config.portAPI}`);
// });

// app.get("/", (req, res) => {
//     res.send(`The server is running on port ${config.portAPI}`);
// });

// module.exports = app;
