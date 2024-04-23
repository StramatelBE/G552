const nBytesToNumber = require('../../Utils/nBytesToNumber');
const Tools = require('../../Utils/Frame_Tools/Frame_Tools_index');

/*
    * 0xAC : Guest Shirt Numbers Summary
 */

class Frame_0xAC {
    static build(_message) {
        return {
            insertType: 'DirectConsoleData',
            Guest: {
                Player:{
                    Number: Tools.ShirtNumber(4, 16, _message)
                },
            }
        };
    }
}

module.exports = Frame_0xAC;
