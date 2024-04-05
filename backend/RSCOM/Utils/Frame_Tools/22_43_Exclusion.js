const nBytesToNumber = require("../nBytesToNumber");

function Exclusion (startIndex, size, _message){
    Timer = new Array(size);

    for (let i = 0; i < size; i++) {
        Timer[i] = nBytesToNumber(_message[startIndex + i], _message[startIndex + i + 1], _message[startIndex + i + 2]);
        if (_message[startIndex + 2 + 5 * i] === 0x30 && _message[startIndex + 2 + 5 * i] === 0x30 && _message[startIndex + 2 + 5 * i] === 0x30) {
            Timer[i] = 1000;
        }
    }

    console.log("Exclusion timer", Timer)

    return Timer;
}

module.exports = Exclusion;