const nBytesToNumber = require('../nBytesToNumber');

function ShirtNumber(startIndex, size, _message) {
    let shirtNumbers = new Array(size);
    for (let i = 0; i < size; i++) {
        if (_message[startIndex + i * 2] === 0x30 && _message[startIndex + 1 + i * 2] === 0x30)
            shirtNumbers[i] = -3;
        else if (_message[startIndex + i * 2] === 0x20 && _message[startIndex + 1 + i * 2] === 0x30)
            shirtNumbers[i] = -2;
        else {
            shirtNumbers[i] = nBytesToNumber(_message[startIndex + i * 2], _message[startIndex + 1 + i * 2])
        }
    }
    return shirtNumbers;
}

module.exports = ShirtNumber;