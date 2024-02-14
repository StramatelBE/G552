const sharedEmitter = require("./SharedEmitter");

// Simulate sending score data
setInterval(() => {
    const scoreData = {
        mode: "score",
        gameState: { message:"Hello" },
    };
    sharedEmitter.emit("score", scoreData);
    console.log("Score data sent", scoreData);
}, 2000);  // send score data every 2 seconds

// Simulate sending media data
setInterval(() => {
    const mediaData = {
        mode: "media",
        path: "/path/to/media/file",
        duration: 120,
    };
    sharedEmitter.emit("media", mediaData);
    console.log("Media data sent", mediaData);
}, 5000);  // send media data every 5 seconds
