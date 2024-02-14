const nBytesToNumber = require("../nBytesToNumber");

function Exclusion (startIndex, step, size, _message){
    let ShirtNumber = new Array(size);
    Timer = new Array(size);

    for (let i = 0; i < size; i++) {
        ShirtNumber[i] = nBytesToNumber(_message[startIndex + i * step], _message[startIndex + i * step + 1]);
        Timer[i] = nBytesToNumber(_message[startIndex + i * step + 2], _message[startIndex + i * step + 3], _message[startIndex + i * step + 4]);

        if (_message[startIndex + 2 + 5 * i] === 0x30 && _message[startIndex + 2 + 5 * i] === 0x30 && _message[startIndex + 2 + 5 * i] === 0x30) {
            Timer[i] = 1000;
        }
    }

    return {
        ShirtNumber,
        Timer,
    }
}

module.exports = Exclusion;