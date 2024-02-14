const nBytesToNumber = require('../nBytesToNumber');

function Score(digit1, digit2, digit3){
    return nBytesToNumber(digit1) * 100 + nBytesToNumber(digit2) * 10 + nBytesToNumber(digit3);
}

module.exports = Score;