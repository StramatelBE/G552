const nBytesToNumber = require('../../Utils/nBytesToNumber');
const Tools = require('../../Utils/Frame_Tools/Frame_Tools_index');
const nBytesToTables = require("../../Utils/nBytesToTables");
const eSport  = require("../../Utils/Enums/eSport");

const Game = require("../../Old_Game");
const e = require('cors');

/*(
    * 0x3A : Table Tennis
 */

class Frame_0x3A {
    static build(_message) {
        return {
            Mode: nBytesToNumber(_message[2]),

            InsertType: "DirectConsoleData",
            Display: eSport.Tennis,
            Sport: eSport.TableTennis,
            Set: nBytesToNumber(_message[14]),

            Chrono: {
                Value: Tools.Chrono(_message[4], _message[5], _message[6], _message[7]),
                Display: Tools.ClockTimerDisplay(_message[21]).Chrono,
            },

            Timer: {
                Status: Tools.TimerStartStop(_message[20]).Status,
                Display: Tools.ClockTimerDisplay(_message[21]).Timer,
                LED: Tools.TimerStartStop(_message[20]).LED,
            },

            Clock: {
                Display: Tools.ClockTimerDisplay(_message[21]).Clock,
            },

            Home: {
                TotalPoints: nBytesToNumber(_message[9], _message[10]),
                SetsWon: nBytesToNumber(_message[15]),
                PointsInSet: nBytesToTables(24, 4, 4, _message),
                Service: Tools.Service(_message[50]).Home,
                Winner: Tools.Winner(_message[51]).Home,
            },

            Guest: {
                TotalPoints: nBytesToNumber(_message[12], _message[13]),
                SetsWon: nBytesToNumber(_message[16]),
                PointsInSet: nBytesToTables(26, 4, 4, _message),
                Service: Tools.Service(_message[50]).Guest,
                Winner: Tools.Winner(_message[51]).Guest,
            }
        };
    }
}

module.exports = Frame_0x3A;
