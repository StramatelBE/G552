const nBytesToNumber = require('../Utils/nBytesToNumber');
const Tools = require('../Utils/Frame_Tools/Frame_Tools_index');
/*
    * 0xA9 : Home Shirt Numbers Summary
 */

class Frame_0xA9 {
    static build(_message) {
        return {
            insertType: 'DirectConsoleData',
            Home: {
                Player: {
                    Number: Tools.ShirtNumber(4, 16, _message)
                },
            }
        };
    }
}

module.exports = Frame_0xA9;