const net = require('net');
const fs = require('fs');
const sharedEmitter = require("../Utils/SharedEmitter");
const { log } = require('console');
const socketPath = '/tmp/_sysmes.sock';


// Check if the socket file already exists then delete it
if (fs.existsSync(socketPath)) {
    fs.unlinkSync(socketPath);
}

function handleData(data) {
    //console.log("Handle Data", data)
    if (data.mode === 9) {
        // Handle score data
    } else {
        // console.log('Received media data');
        // Handle media data
    }
}

function deepEqual(a, b) {
    if (a === b) return true;

    if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) {
        return false;
    }

    let keysA = Object.keys(a), keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (let key of keysA) {
        if (!keysB.includes(key)) return false;
        if (Array.isArray(a[key]) && Array.isArray(b[key])) {
            if (!arraysAreEqual(a[key], b[key])) return false;
        } else if (typeof a[key] === 'object' && typeof b[key] === 'object') {
            if (!deepEqual(a[key], b[key])) return false;
        } else if (a[key] !== b[key]) {
            return false;
        }
    }

    return true;
}

function arraysAreEqual(arrA, arrB) {
    if (arrA.length !== arrB.length) return false;
    for (let i = 0; i < arrA.length; i++) {
        if (!deepEqual(arrA[i], arrB[i])) return false;
    }
    return true;
}

function isObject(value) {
    return value && typeof value === 'object' && value.constructor === Object;
}




let previousDataMode = null;
let previousData = null;

const server = net.createServer((client) => {

    function onDataReceived(data) {

        const scoreModes = [0];
        const immediateModes = [16, 17, 18, 19, 20];
        const macroModes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 21];
        const stopModes = [22, 23, 24, 25, 99];
        // console.log("Previous Data Mode", previousDataMode)
        // console.log("Data Mode", data?.Mode)

        try {
            handleData(data);
            //console.log("Selected mode:", data?.Mode)


            if (scoreModes.includes(data?.Mode) || stopModes.includes(data?.Mode)) {
                //console.log("Mode scoring:", data?.Mode)
                previousDataMode = data?.Mode;
                previousData = data;
                client.write(JSON.stringify(data) + '\n');
                // console.log("Period", data.Period)
                // console.log("Timer", data.Timer.Value)
                // console.log("Home", data.Home.TeamName)
                // console.log("TimeOut", data.Home.Timeout.Count)
                // console.log("Points", data.Home.Points)
                // console.log("Guest", data.Guest.TeamName)
                // console.log("Points", data.Guest.Points)
                // console.log("TimeOut", data.Guest.Timeout.Count)

                // console.log('Sent score gameState', data)
            } else if (immediateModes.includes(data?.Mode)) {
                // console.log("Mode instant:", data?.Mode)
                previousDataMode = data?.Mode;
                previousData = data;
                client.write(JSON.stringify(data) + '\n');
            } else if (!deepEqual(data, previousData) && macroModes.includes(data?.Mode)) {
                // console.log("Mode Macro:", data?.Mode)
                // console.log(data);
                previousDataMode = data?.Mode;
                previousData = data;
                // console.log("+")
                client.write(JSON.stringify(data) + '\n');
            }

        } catch (err) {
            console.error('Failed to send gameState', err);

        }
    }

    // Attach listeners to sharedEmitter
    sharedEmitter.on('data-received', onDataReceived);

    client.on('close', () => {
        console.log('Client disconnected');
        sharedEmitter.removeListener('data-received', onDataReceived);
    });

    client.on('scoring', (data) => {
        try {
            // console.log('Received raw gameState', data)
            const parsedData = JSON.parse(data.toString());
            sharedEmitter.emit('data-received', parsedData);
        } catch (err) {
            console.error('Failed to parse JSON gameState', err);
        }
    });

    client.on('error', (err) => {
        console.error('Client error:', err);
    });

});

module.exports = {
    startServer: function () {
        server.listen(socketPath, () => {
            console.log(`UnixSocket Server listening on ${socketPath}`);
        });
    },
    sendData: function (data) {
        // console.log('DataMode sended:')
        // console.log(data?.Mode)
        sharedEmitter.emit('data-received', data);
    },
    sendPrematchData: function (data) {
        // console.log('DataMode sended:')
        // console.log(data?.Mode)
        sharedEmitter.emit('data-received', data);
    },
    sendMedia: function (data) {
        // console.log('MediaMode sended:')
        // console.log(data?.Mode)
        sharedEmitter.emit('data-received', data);
    }
}
