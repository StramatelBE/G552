// const net = require('net');
// const fs = require('fs');
// const sharedEmitter = require("../Utils/SharedEmitter");
// const socketPath = '/tmp/_sysmes.sock';
//
// // Check if the socket file already exists then delete it
//  if (fs.existsSync(socketPath)) {
//     fs.unlinkSync(socketPath);
// }
//
// function handleData(data) {
//     if (data.mode === 'scoring') {
//         // console.log('Handled score data');
//         // Do something with score data
//     } else if (data.mode === 'media') {
//         console.log('Received media data');
//         // Do something with media data
//     } else {
//         console.warn('Received unknown data mode:', data.mode);
//     }
// }
//
// const server = net.createServer((client) => {
//     // Define listener functions
//     function onScoring(data) {
//         try {
//             handleData(data);
//             if (data.mode === 'scoring') {
//                 client.write(JSON.stringify(data) + '\n');
//             } else if (data.mode === 'media') {
//                 client.write(JSON.stringify({ mode: 'diaporama', path: data.path, duration: data.duration }) + '\n');
//                 console.log('Sent gameState', data)
//             }
//         } catch (err) {
//             console.error('Failed to send score gameState', err);
//         }
//     }
//
//     function onMedia(data) {
//         try {
//             client.write(JSON.stringify(data) + '\n');
//         } catch (err) {
//             console.error('Failed to send media gameState', err);
//         }
//     }
//
//     // Attach listeners to sharedEmitter
//     sharedEmitter.on('scoring', onScoring);
//     sharedEmitter.on('media', onMedia);
//
//     client.on('close', () => {
//         console.log('Client disconnected');
//         // Remove listeners to avoid duplicates
//         sharedEmitter.removeListener('scoring', onScoring);
//         sharedEmitter.removeListener('media', onMedia);
//     });
//
//     client.on('data', (data) => {
//         try {
//             // console.log('Received raw gameState', data)
//             // console.log('Client on data Received gameState', data.toString())
//         } catch (err) {
//             console.error('Failed to parse JSON gameState', err);
//         }
//     });
//
//     client.on('error', (err) => {
//         console.error('Client error:', err);
//     });
// });
//
//
//
// let fetchMediaInterval;
// sharedEmitter.on('mode-updated', (data) => {
//     if (data.mode === 'diaporama') {
//         // Supposons que l'ID de l'événement est également passé dans data
//         const eventId = data.eventId;
//         const eventMedia = new EventMedia(); // Créez une instance de EventMedia pour appeler getAllByEvent
//         if(fetchMediaInterval) clearInterval(fetchMediaInterval); // Clear existing interval if any
//         fetchMediaInterval = setInterval(() => {
//             eventMedia.getAllByEvent(eventId)
//                 .then(medias => {
//                     console.log("Fetched medias:", medias);
//                     // Convertir les médias en JSON et les envoyer via le socket client
//                     try {
//                         client.write(JSON.stringify({ mode: 'diaporama', medias }) + '\n');
//                     } catch (err) {
//                         console.error('Failed to send media gameState', err);
//                     }
//                 })
//                 .catch(err => {
//                     console.error("Erreur lors de la récupération des médias par événement: ", err);
//                 });
//         }, 10000); // Remplacez 10000 par le temps souhaité en ms entre chaque fetch
//     }
//     else if (fetchMediaInterval) {
//         // Si le mode n'est pas diaporama, clear l'intervalle
//         clearInterval(fetchMediaInterval);
//     }
// });
//
// // Export the function to start the server
// module.exports = {
//     startServer: function () {
//         server.listen(socketPath, () => {
//             console.log(`UnixSocket Server listening on ${socketPath}`);
//         });
//     },
//     sendScoring: function (data) {
//         // console.log('UNIX Socket is sending data on data');
//         sharedEmitter.emit('scoring', data);
//     }
// }


const net = require('net');
const fs = require('fs');
const sharedEmitter = require("../Utils/SharedEmitter");
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

        const scoreModes = [9];
        const immediateModes = [0, 1, 2, 16, 17, 18, 19, 20];
        const macroModes = [3, 4, 5, 6, 7, 8, 21];
        const stopModes = [22, 23];
        // console.log("Previous Data Mode", previousDataMode)
        // console.log("Data Mode", data?.Mode)

        try {
            handleData(data);
            console.log("Selected mode:", data?.Mode)


            if (scoreModes.includes(data?.Mode) || stopModes.includes(data?.Mode)) {
                console.log("Mode scoring:", data?.Mode)
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
                console.log("Mode instant:", data?.Mode)
                previousDataMode = data?.Mode;
                previousData = data;
                client.write(JSON.stringify(data) + '\n');
            } else if (!deepEqual(data, previousData) && macroModes.includes(data?.Mode)) {
                console.log("Mode Macro:", data?.Mode)
                previousDataMode = data?.Mode;
                previousData = data;
                console.log("+")
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
            console.log('Received raw gameState', data)
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
        console.log('UNIX Socket is sending scoring')
        console.log(data)
        sharedEmitter.emit('data-received', data);
    },
    sendMedia: function (data) {
        console.log('UNIX Socket is sending media')
        sharedEmitter.emit('data-received', data);
    }
}
