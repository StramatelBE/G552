const nBytesToNumber = require('../Utils/nBytesToNumber');
const nBytesToTables = require('../Utils/nBytesToTables');
const LED = require("../Utils/Enums/eLED");
const Tools = require("../Utils/Frame_Tools/Frame_Tools_index");
const eSport = require("../Utils/Enums/eSport");

/*
    * 0x35 : Boxe
 */

class Frame_0x35 {
    static build(_message) {
        return {
            Mode: nBytesToNumber(_message[2]),
            insertType: 'DirectConsoleData',
            Sport: eSport.Handball,

            Timer: {
                Value: Tools.Chrono(_message[4], _message[5], _message[6], _message[7]),
                Status: Tools.TimerStartStop(_message[20]).Status,
                LED: Tools.TimerStartStop(_message[20]).LED,
                Horn: Tools.Horn(_message[19]),
            },

            Period: nBytesToNumber(_message[14]),

            Home: {
                Warnings: nBytesToNumber(_message[10]),
            },

            Guest: {
                Warnings: nBytesToNumber(_message[13]),
            }
        };
    }
}

module.exports = Frame_0x35;
