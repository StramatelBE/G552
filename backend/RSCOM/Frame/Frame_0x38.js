const nBytesToNumber = require('../Utils/nBytesToNumber');
const LED = require("../Utils/Enums/eLED");
const Tools = require("../Utils/Frame_Tools/Frame_Tools_index");
const eSport = require("../Utils/Enums/eSport");

/*
    * 0x38 : Basketball Home Individual Points
 */

class Frame_0x38 {
    static build(_message) {
        return {
            Mode: nBytesToNumber(_message[2]),
            InsertType: "DirectConsoleData",

            Timer: {
                Value: Tools.Chrono(_message[4], _message[5], _message[6], _message[7]),
                Display: Tools.ClockTimerDisplay(_message[21]).Timer,
                Status: Tools.TimerStartStop(_message[20]).Status,
                LED: Tools.TimerStartStop(_message[20]).LED,
            },

            Clock: {
                Display: Tools.ClockTimerDisplay(_message[21]).Clock,
            },

            Timer24s: {
                Value: Tools.Chrono24s(nBytesToNumber(_message[48]), nBytesToNumber(_message[49])),
                Status: Tools.sTimerStartStop(_message[51]).Status,
                LED: Tools.sTimerStartStop(_message[51]).LED,
                Horn24s: Tools.sHorn(_message[50]),
            },

            Home: {
                IndividualPoints: Tools.IndividualPoints(_message),
            },
        };
    }
}

module.exports = Frame_0x38;