// TABLE TENNIS

const nBytesToNumber = require('../Utils/nBytesToNumber');
const Tools = require('../Utils/Frame_Tools/Frame_Tools_index');
const nBytesToTables = require("../Utils/nBytesToTables");
const eSport  = require("../Utils/Enums/eSport");

const e = require('cors');

/*(
    * 0x42 : Table Tennis
 */

module.exports = class Frame_0x42 {
    static build(_message) {
        return {
            Mode: nBytesToNumber(_message[2]),

            InsertType: "DirectConsoleData",
            Display: eSport.Tennis,
            Sport: eSport.TableTennis,
            Set: nBytesToNumber(_message[14]),

            Timer: {
                Status: Tools.TimerStartStop(_message[20]).Status,
                Display: Tools.ClockTimerDisplay(_message[21]).Timer,
                LED: Tools.TimerStartStop(_message[20]).LED,
                Value: Tools.Chrono(_message[4], _message[5], _message[6], _message[7]),
            },

            Clock: {
                Display: Tools.ClockTimerDisplay(_message[21]).Clock,
            },

            Home: {
                Points: nBytesToNumber(_message[9], _message[10]),
                SetsWon: nBytesToNumber(_message[15]),
                PointsInSet: nBytesToTables(24, 4, 4, _message),
                Service: Tools.Service(_message[50]).Home,
                Winner: Tools.Winner(_message[51]).Home,
            },

            Guest: {
                Points: nBytesToNumber(_message[12], _message[13]),
                SetsWon: nBytesToNumber(_message[16]),
                PointsInSet: nBytesToTables(26, 4, 4, _message),
                Service: Tools.Service(_message[50]).Guest,
                Winner: Tools.Winner(_message[51]).Guest,
            }
        };
    }
}


