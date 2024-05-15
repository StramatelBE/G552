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
const QRCode = require('qrcode');

const User = require('./Models/userModel');
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json({ limit: '800mb' }));
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

const { SerialPortConnection, sharedEmitter } = require("./RSCOM/SerialPorts/SerialPortConnection");
const sp = new SerialPortConnection();

sp.StartReading();
sharedEmitter.on("data", (data) => {
    Game.update(data);
});

cronJobs.startAllJobs();

let previousScoring = 0;
let previousMacrosDataMode = null;
let mode = 0;

sharedEmitter.on("scoring", handleScoring);


// sharedEmitter.on("scoring", async (scoring) => {
//     try {
//         const macro = new MacroController();
//         // console.log("Scoring Mode:", scoring.Mode);
//         // console.log(scoring, "?", previousScoring)
//         // scoring === previousScoring ? console.log('.') : console.log('{!}');
//         //TODO: Parse, Save and Check if the scoring is different from the previous one


//         //TODO: Test the sending of the scoring mode 9 before sending the media to avoid the bug of the media not being displayed

//         //console.log("Scoring Mode:", scoring.Mode);
//         if (scoring.Mode === 9) {
//             //console.log("The mode scoring has been sended");
//             unixSocketSetup.sendData(scoring);
//             previousMacrosDataMode = null;
//         } else if (scoring.Mode === 0 || scoring.Mode === 1 || scoring.Mode === 2 || scoring.Mode === 16 || scoring.Mode === 17 || scoring.Mode === 18 || scoring.Mode === 19 || scoring.Mode === 20) {
//             mode = scoring.Mode;
//             // scoring.Mode = 9;
//             // unixSocketSetup.sendData(scoring);
//             scoring.Mode = mode;
//             unixSocketSetup.sendData(scoring);
//             previousMacrosDataMode = null;
//         } else if (scoring.Mode === 3 || scoring.Mode === 4 || scoring.Mode === 5 || scoring.Mode === 6 || scoring.Mode === 7 || scoring.Mode === 8) {
//             mode = scoring.Mode;
//             // scoring.Mode = 9;
//             // unixSocketSetup.sendData(scoring);
//             scoring.Mode = mode;
//             const macrosData = await macro.getMacrosByButton(scoring.Mode);
//             // console.log(scoring.Mode, "!==", previousMacrosDataMode)
//             // console.log("Medias datas were different from the previous one, sending data...")
//             macrosData[0].Mode = scoring.Mode;
//             previousMacrosDataMode = scoring.Mode; // Update the cache
//             unixSocketSetup.sendMedia(macrosData[0]);
//             // unixSocketSetup.sendData(scoring);

//             // if (!macrosData) {
//             //     scoring.Mode = 9;
//             //     unixSocketSetup.sendData(scoring);
//             //     console.log("No event for this macro, sending Mode", scoring.Mode)
//             //
//             // } else {
//             //     // Only send data if it's different from the previous macro's data
//             //
//             // }
//         }
//     } catch (error) {
//         console.error("Erreur lors de la récupération des macros:", error.message);
//     }
// });


sharedEmitter.on("media", (media) => {
    unixSocketSetup.sendMedia(media);
});

const authRoutes = require("./Routes/authRoutes");
const activeSessionsRoutes = require("./Routes/activeSessionsRoutes");
const userRoutes = require("./Routes/userRoutes");
const spaceRoutes = require("./Routes/spaceRoutes");
const modeRoutes = require("./Routes/modeRoutes");
app.get("/qrcode", async (req, res) => {
    try {
        const ssid = process.env.SSID;
        const password = process.env.PASSWORD;
        const authType = process.env.AUTH_TYPE;

        const qrCode = `WIFI:T:${authType};S:${ssid};P:${password};;`;
        const qrImage = await QRCode.toDataURL(qrCode);

        res.send(`
            <div style="display: flex; justify-content: center; align-items: center;">
                <img src="${qrImage}" alt="QR Code" />
            </div>
        `);
    }
    catch (error) {
        console.error("Error while generating QR Code:", error.message);
        res.status(500).send("Error while generating QR Code");
    }
});
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
