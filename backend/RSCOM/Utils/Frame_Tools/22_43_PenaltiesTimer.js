const nBytesToNumber = require('../nBytesToNumber');

function PenaltiesTimer(startIndex, step, size, _message) {
    let PenaltiesTimer = new Array(size);

    for (let i = 0; i < size; i++) {
        PenaltiesTimer[i] = nBytesToNumber(_message[startIndex + i * step], _message[startIndex + i * step + 1], _message[startIndex + i * step + 2]);
    }

    return PenaltiesTimer;
}

module.exports = PenaltiesTimer;