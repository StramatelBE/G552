const nBytesToNumber = require("../nBytesToNumber");

function PlayerName(index, _message){
    const indexPlayer = index - 0x30;
    let playerName = "";
    let playerNumber = 0;
    // If the index of the player is valid, store the player's name and number in the GSI object
    if (indexPlayer >= 0 && indexPlayer < 16) {
        // Store the player's name in the GSI object
        playerName = Buffer.from(_message.slice(3, 27)).toString('utf16le');

        // -3 means number 00
        if (_message[51] === 0x30 && _message[52] === 0x30) {
            playerNumber = -3;
        }
        // -2 means number 0
        else if (_message[51] === 0x00 && _message[52] === 0x30) {
            playerNumber = -2;
        } else {
            // Store the player's number in the GSI object
            playerNumber = nBytesToNumber(_message[51], _message[52]);
        }
    }
    return {
        indexPlayer,
        playerName,
        playerNumber
    }
}

module.exports = PlayerName;