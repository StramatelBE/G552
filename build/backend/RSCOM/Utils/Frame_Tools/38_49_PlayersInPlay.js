const nBytesToNumber = require('../nBytesToNumber');

function PlayersInPlay(_message) {
    let PlayersInPlay = {
        Home: [false, false, false, false, false, false],
        Guest: [false, false, false, false, false, false],
    }
    for (let i = 0; i < 6; i++) {
        if (_message[38 + i] >= 0x30 && _message[38 + i] <= 0x3f) {
            PlayersInPlay.Home[i] = true;
        }
        if (_message[44 + i] >= 0x30 && _message[44 + i] <= 0x3f) {
            PlayersInPlay.Guest[i] = true;
        }
    }
    return PlayersInPlay;
}

module.exports = PlayersInPlay;