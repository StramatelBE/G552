// BADMINTON

const nBytesToNumber = require('../Utils/nBytesToNumber');
const Tools = require('../Utils/Frame_Tools/Frame_Tools_index');
const LED = require("../Utils/Enums/eLED");
const nBytesToTables = require("../Utils/nBytesToTables");
const eSport = require("../Utils/Enums/eSport");

/*
    * 0x41 : Badminton
 */

module.exports = class Frame_0x41 {
    static build(_message) {
        return {
            Mode: nBytesToNumber(_message[2]),
            insertType: 'DirectConsoleData',
            Sport: eSport.Badminton,
            Display: eSport.Tennis,

            Chrono: {
                Value: Tools.Chrono(_message[4], _message[5], _message[6], _message[7]),
                Display: Tools.ClockTimerDisplay(_message[8]).Chrono,
            },

            Home: {
                Points: nBytesToNumber(_message[9], _message[10]),
                SetsWon: nBytesToNumber(_message[15]),
                PointsInSet: nBytesToTables(24, 4, 3, _message),
                Service: Tools.Service(_message[50]).Home,
                Winner: Tools.Winner(_message[51]).Home,
            },

            Guest: {
                Points: nBytesToNumber(_message[12], _message[13]),
                SetsWon: nBytesToNumber(_message[16]),
                PointsInSet: nBytesToTables(26, 4, 3, _message),
                Service: Tools.Service(_message[50]).Guest,
                Winner: Tools.Winner(_message[51]).Guest,
            },

            Timer: {
                Status: Tools.TimerStartStop(_message[20]).Status,
                LED: Tools.TimerStartStop(_message[20]).LED,
            },

            Clock: {
                Display: Tools.ClockTimerDisplay(_message[21]).Clock,
            }
        };
    }
}

