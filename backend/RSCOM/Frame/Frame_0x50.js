// CHRONO

const nBytesToNumber = require('../Utils/nBytesToNumber');
const LED = require("../Utils/Enums/eLED");
const Tools = require('../Utils/Frame_Tools/Frame_Tools_index');

/*
    * 0x50 : Simple Timer
 */

module.exports = class Frame_0x50 {
    static build(_message){
        return {
            Mode: nBytesToNumber(_message[2]),
            insertType: 'DirectConsoleData',
            Chrono: {
                Value: Tools.Chrono(_message[4], _message[5], _message[6], _message[7]),
                Display: Tools.ClockTimerDisplay(_message[8]).Chrono,
            },

            Clock: {
                Display: Tools.ClockTimerDisplay(_message[21]).Clock,
            },

            Timer: {
                Status: Tools.TimerStartStop(_message[20]).Status,
                LED: Tools.TimerStartStop(_message[20]).LED,
            },

            Horn: Tools.Horn(_message[19]),
        };
    }
}

