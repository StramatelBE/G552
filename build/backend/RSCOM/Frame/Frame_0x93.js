const Tools = require('../Utils/Frame_Tools/Frame_Tools_index');
const nBytesToNumber = require('../Utils/nBytesToNumber');
const eSport = require('../Utils/Enums/eSport');

/*
    * 0x93 : Handball
 */

class Frame_0x93 {
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

            Home: {
                Points: nBytesToNumber(_message[9], _message[10]),
                PenaltiesInProgress: Tools.PenaltiesInProgress(_message[15]),
                Timeout: {
                    Count: nBytesToNumber(_message[17]),
                },
                PenaltiesTimer: Tools.PenaltiesTimer(22, 3, 3, _message),
            },

            Guest: {
                Points: nBytesToNumber(_message[12], _message[13]),
                PenaltiesInProgress: Tools.PenaltiesInProgress(_message[16]),
                Timeout: {
                    Count: nBytesToNumber(_message[18]),
                },
                PenaltiesTimer: Tools.PenaltiesTimer(35, 3, 3, _message),
            },

            Period: nBytesToNumber(_message[14]),
        }
    }
}

module.exports = Frame_0x93;