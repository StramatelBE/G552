const {StringDecoder} = require('string_decoder');
const Encode = require('../Utils/Encode');
const Tools = require('../Utils/Frame_Tools/Frame_Tools_index');

/*
    * 0x77 : Player Names and shirt numbers of the players
 */

// This class is used to process and build the 0x62 frame
class Frame_0x77_PlayerNames {
    // This static method is used to build the 0x62 frame
    static build(_message) {
        let reEncodedMessage = Encode(_message);
        let GuestInfos = Tools.PlayerName(_message[2], reEncodedMessage);
        return {
            insertType: 'DirectConsoleData',
            Guest: {
                Player: {
                    Name: Array(16).fill().map((_, i) => i === GuestInfos.indexPlayer ? GuestInfos.playerName : ""),
                    Number: Array(16).fill().map((_, i) => i === GuestInfos.indexPlayer ? GuestInfos.playerNumber : "")
                },
            }
        };
    }
}

// Export the Frame_0x77_PlayerNames class
module
    .exports = Frame_0x77_PlayerNames;
