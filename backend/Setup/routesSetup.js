const checkToken = require("../Middlewares/signInCheck");

const authRoutes = require("../Routes/authRoutes");
const activeSessionsRoutes = require("../Routes/activeSessionsRoutes");
const userRoutes = require("../Routes/userRoutes");
const spaceRoutes = require("../Routes/spaceRoutes");
const modeRoutes = require("../Routes/modeRoutes");
const scoringRoutes = require("../Routes/scoringRoutes");
const mediaRoutes = require("../Routes/mediaRoutes");
const eventmediaRoutes = require("../Routes/eventmediaRoutes");
const eventRoutes = require("../Routes/eventRoutes");
const macroRoutes = require("../Routes/macroRoutes");
const buttonRoutes = require("../Routes/buttonRoutes");
const paramRoutes = require("../Routes/paramRoutes");
const veilleRoutes = require("../Routes/veilleRoutes");
const adminRoutes = require("../Routes/adminRoutes");

const setupRoutes = (app) => {
    app.use("/activeSessions", activeSessionsRoutes);
    app.use("/auth", authRoutes);
    app.use("/users", userRoutes);
    app.use("/mode", modeRoutes);
    app.use("/space", spaceRoutes);
    app.use(checkToken);

    app.use("/scores", scoringRoutes);
    app.use("/medias", mediaRoutes);
    app.use("/events", eventRoutes);
    app.use("/eventmedias", eventmediaRoutes);
    app.use("/macros", macroRoutes);
    app.use("/buttons", buttonRoutes);
    app.use("/params", paramRoutes);
    app.use("/veilles", veilleRoutes);
    app.use("/admin", adminRoutes);
};

module.exports = setupRoutes;
