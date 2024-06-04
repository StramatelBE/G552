const { StringDecoder } = require('string_decoder');
const Encode = require('../../Utils/Encode');
const Tools = require('../../Utils/Frame_Tools/Frame_Tools_index');
/*
    * 0x77 : Team Names
 */
class Frame_0x77_TeamNames {
    static build(_message) {
        let reEncodedMessage = Encode(_message);
        return {
            insertType: 'DirectConsoleData',
            Home: { TeamName: Tools.TeamName(6, reEncodedMessage) },
            Guest: { TeamName: Tools.TeamName(30, reEncodedMessage) }
        };
    }
}
module.exports = Frame_0x77_TeamNames;