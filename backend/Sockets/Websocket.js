const config = require("../config");
let timerInterval;
let timerValue = 0;

function setupSocketDesk(desk) {
    desk.on("connection", (socket) => {
        socket.on("connect", () => {
            console.log("Connected to desk socket");
        });
        socket.on("message", (data) => {
            console.log(`Received message from desk`);
            console.log(data);
            desk.emit(
                "message",
                "Message du serveur vers le client avec le message envoyé par le client: " +
                data
            );
        });
        socket.on("getTimerValue", () => {
            socket.emit("timerValue", timerValue);
        });
        socket.on("timerUpdate", (data) => {
            timerValue = data;
            console.log(`Le client a mis à jour le minuteur à ${timerValue}`);
        });
        socket.on("startTimer", startTimer(desk));
        socket.on("stopTimer", stopTimer(io));
        socket.on("startBuzzer", () => {
            console.log("Le client fait sonner le buzzer");
        });
        socket.on("disconnect", () => {
            console.log("Un client s'est déconnecté");
        });
    });
}

function startTimer(desk) {
    return () => {
        console.log("Le client a démarré le minuteur");
        if (!timerInterval && timerValue > 0) {
            timerInterval = setInterval(() => {
                console.log(timerValue);
                timerValue -= 1;
                if (timerValue === 0) {
                    console.log("Le minuteur est arrivé à zéro");
                    clearInterval(timerInterval);
                    timerInterval = null;
                }
                desk.emit("timerUpdate", timerValue);
            }, 1000);
        }
    }
}

function stopTimer(io) {
    return () => {
        console.log("Le client a arrêté le minuteur");
        clearInterval(timerInterval);
        timerInterval = null;
        io.emit("timerUpdate", timerValue);
    }
}

module.exports = function(app) {
    const server = require('http').Server(app);
    const io = require('socket.io')(server);

    server.listen(config.portWS, () => {
        console.log(`WebSocket Server started on ${config.ip}:${config.portWS}`);
    });
}
