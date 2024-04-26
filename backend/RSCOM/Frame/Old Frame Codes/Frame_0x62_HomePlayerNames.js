const {StringDecoder} = require('string_decoder');
const Encode = require('../../Utils/Encode');
const Tools = require('../../Utils/Frame_Tools/Frame_Tools_index');

/*
    * 0x62 : Player Names and shirt numbers of the players
 */
class Frame_0x62_HomePlayerNames {
    static build(_message) {
        let reEncodedMessage = Encode(_message);
        let HomeInfos = Tools.PlayerName(_message[2], reEncodedMessage);
        return {
            insertType: 'DirectConsoleData',
            Home: {
                Player: {
                    Name: Array(16).fill().map((_, i) => i === HomeInfos.indexPlayer ? HomeInfos.playerName : ""),
                    Number: Array(16).fill().map((_, i) => i === HomeInfos.indexPlayer ? HomeInfos.playerNumber : "")
                },
            }
        };
    }
}

module.exports = Frame_0x62_HomePlayerNames;
