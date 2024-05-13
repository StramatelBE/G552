const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const config = require("./src/config.js");
const net = require("net");
const { saveData, readData } = require("./store");
const { log } = require("console");

const socketPath = "/tmp/_sysmes.sock";

require("electron-reload")(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`),
});

let mainWindow;

function handleData(data) {
    if (mainWindow && !mainWindow.isDestroyed()) {
        if (data.Mode === 0) {
            mainWindow.webContents.send("server-data", data);
        } else if (data.Mode === 9) {
            mainWindow.webContents.send("server-data", data);
        } else if (data.Mode === 1) {
            mainWindow.webContents.send("server-data", data);
        } else if (data.Mode === 2) {
            mainWindow.webContents.send("server-data", data);
        } else if (data.Mode === 16) {
            mainWindow.webContents.send("server-data", data);
        } else if (data.Mode === 17) {
            mainWindow.webContents.send("server-data", data);
        } else if (data.Mode === 18) {
            mainWindow.webContents.send("server-data", data);
        } else if (data.Mode === 19) {
            mainWindow.webContents.send("server-data", data);
        } else if (data.Mode === 20) {
            mainWindow.webContents.send("server-data", data);
        } else if (data.Mode === 21) {
            mainWindow.webContents.send("server-data", data);
        } else if (data.Mode === 22) {
            mainWindow.webContents.send("server-data", data);
        } else if (data.Mode === 23) {
            mainWindow.webContents.send("server-data", data);
        } else if (data.Mode === null || data.Mode === undefined) {
            mainWindow.webContents.send("server-data", data);
        } else {
            mainWindow.webContents.send("server-data", data);
        }
    }
}

function createWindows() {
    mainWindow = new BrowserWindow({
        width: config.display.width,
        height: config.display.height,
        x: 0,
        y: 0,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        },
    });
    //TODO:TRUC DEV
    mainWindow.webContents.openDevTools();
    //mainWindow.loadFile("dist/index.html");
    mainWindow.loadURL('http://localhost:2000');
    mainWindow.removeMenu();
    mainWindow.setMenu(null);
    mainWindow.setAlwaysOnTop(true, "screen-saver");
    mainWindow.webContents.on("did-finish-load", () => {
        const css = `body { overflow: hidden; }`;
        mainWindow.webContents.insertCSS(css);
        console.log("Main window loaded");
        mainWindow.webContents.send("message", "Hello second window!");
    });

    function connectToServer() {
        let dataBuffer = "";

        try {
            const client = net.createConnection({ path: socketPath }, () => {
                console.log("Connected to server!");
                client.write(
                    "Display is connected! You can send scoring and medias.\n"
                );
            });

            client.on("data", (data) => {
                dataBuffer += data.toString();
                if (dataBuffer.endsWith("\n")) {
                    // console.log("Raw gameState", dataBuffer); // Log raw data here
                    try {
                        const jsonData = JSON.parse(data.toString());
                        handleData(jsonData);
                        // client.write('Display has successfully received data!');
                        dataBuffer = "";
                    } catch (err) {
                        console.error("Failed to parse JSON gameState", err);
                    }
                }
            });

            client.on("error", (err) => {
                console.error("Error occurred with the client socket:", err);
                setTimeout(connectToServer, 5000);
            });

            client.on("end", () => {
                console.log("Disconnected from server");
                setTimeout(connectToServer, 5000);
            });
        } catch (err) {
            console.error("Failed to create client connection:", err);
            setTimeout(connectToServer, 5000);
        }
    }

    connectToServer();
}

app.disableHardwareAcceleration();

app.whenReady().then(createWindows);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindows();
    }
});

ipcMain.on("save-data", (event, data) => {
    saveData(data);
    event.reply("data-saved");
});

ipcMain.on("load-data", (event) => {
    const data = readData();
    event.reply("data-loaded", data);
});
