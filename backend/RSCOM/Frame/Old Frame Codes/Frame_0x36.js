const nBytesToNumber = require('../../Utils/nBytesToNumber');
const Tools = require('../../Utils/Frame_Tools/Frame_Tools_index');
const nBytesToTables = require("../../Utils/nBytesToTables");
const eSport = require("../../Utils/Enums/eSport");

/*
    * 0x36 : Volleyball
 */

class Frame_0x36 {
    static build(_message) {
        return {
            Mode: nBytesToNumber(_message[2]),
            InsertType: 'DirectConsoleData',
            Sport: eSport.Volleyball,
            Display: eSport.Volleyball,

            Timer: {
                Value: Tools.Chrono(_message[4], _message[5], _message[6], _message[7]),
                Status: Tools.TimerStartStop(_message[20]).Status,
                LED: Tools.TimerStartStop(_message[20]).LED,
                Display: Tools.ClockTimerDisplay(_message[21]).Timer,
            },

            Clock: {
                Display: Tools.ClockTimerDisplay(_message[21]).Clock,
            },

            Home: {
                TotalPoints: nBytesToNumber(_message[9], _message[10]),
                SetsWon: nBytesToNumber(_message[15]),
                Timeout: {
                    Count: nBytesToNumber(_message[17]),
                },
                PointsBySet: nBytesToTables(22, 4, 4, _message),
                PlayersInPlay: Tools.PlayersInPlay(_message).Home,
                Service: Tools.Service(_message[50]).Home,
                Winner: Tools.Winner(_message[51]).Home,
            },

            Guest: {
                TotalPoints: nBytesToNumber(_message[12], _message[13]),
                SetsWon: nBytesToNumber(_message[16]),
                Timeout: {
                    Count: nBytesToNumber(_message[18]),
                },
                PointsBySet: nBytesToTables(26, 4, 4, _message),
                PlayersInPlay: Tools.PlayersInPlay(_message).Guest,
                Service: Tools.Service(_message[50]).Guest,
                Winner: Tools.Winner(_message[51]).Guest,
            }
        };
    }
}

module.exports = Frame_0x36;
