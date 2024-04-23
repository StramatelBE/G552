const { StringDecoder } = require('string_decoder');
const Encode = require('../../Utils/Encode');
const Tools = require('../../Utils/Frame_Tools/Frame_Tools_index');
/*
    * 0x62 : Team Names
 */

class Frame_0x62_TeamNames {
    static build(_message) {
        // let reEncodedMessage = Encode(_message);
        //console.log("Frame_0x62_TeamNames.build was called with _message: ", _message);

        return {
            insertType: 'DirectConsoleData',
            Home: { TeamName: Tools.TeamName(6, _message) },
            Guest: { TeamName: Tools.TeamName(30, _message) }
        };
    }
}
module.exports = Frame_0x62_TeamNames;
