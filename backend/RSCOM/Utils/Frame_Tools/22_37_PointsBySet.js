const nBytesToNumber = require('../nBytesToNumber');


function pointsBySet(startIndex, size, step, message) {
    // LOG EVERY MESSAGE
    // Highlight every value that must be in the Array
    for (let i = 0; i < message.length; i+=2) {
        console.log(i, nBytesToNumber(message[i], message[i + 1]));
        console.log(i, message[i], message[i + 1]);
    }
    for (let i = 0; i < message.length; i++) {
        console.log(i, nBytesToNumber(message[i], message[i + 1]));
        console.log(i, message[i], message[i + 1]);
    }


    let pointsBySet = new Array(size);
    for (let i = 0; i < size; i++) {
        pointsBySet[i] = nBytesToNumber(message[startIndex + i * step], message[startIndex + i * step + 1]);
    }
    return pointsBySet;
}

module.exports = pointsBySet;
