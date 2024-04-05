const nBytesToNumber = require('../Utils/nBytesToNumber');
const nBytesToTables = require('../Utils/nBytesToTables');
const LED = require("../Utils/Enums/eLED");
const Tools = require("../Utils/Frame_Tools/Frame_Tools_index");
const eSport = require("../Utils/Enums/eSport");
const { Home } = require('../Utils/Enums/eTeam');

/*
    * 0x35 : Handball / Soccer / Boxe
 */

class Frame_0x35 {
    static build(_message) {
        return {
            Mode: nBytesToNumber(_message[2]),
            insertType: 'DirectConsoleData',
            Sport: eSport.Handball,

            Timer: {
                Value: Tools.Chrono(_message[4], _message[5], _message[6], _message[7]),
                Display: Tools.ClockTimerDisplay(_message[8]).Timer,
                Status: Tools.TimerStartStop(_message[20]).Status,
                LED: Tools.TimerStartStop(_message[20]).LED,
                Horn: Tools.Horn(_message[19]),
            },

            Period: nBytesToNumber(_message[14]),

            Home: {
                Points: nBytesToNumber(_message[9], _message[10]),
                Fouls: {
                    Team: nBytesToNumber(_message[8]),
                },
                PenaltiesInProgress: Tools.PenaltiesInProgress(_message[15]),
                Timeout : {
                    Counts: nBytesToNumber(_message[17]),
                },
                Exclusion: {
                    Timer: [Tools.TimeOut(22, 23, 24), Tools.TimeOut(25, 26, 27), Tools.TimeOut(28, 29, 30)],
                }
            },

            Guest: {
                Points: nBytesToNumber(_message[12], _message[13]),
                Fouls: {
                    Team: nBytesToNumber(_message[11]),
                },
                PenaltiesInProgress: Tools.PenaltiesInProgress(_message[16]),
                TimeoutsCounts: nBytesToNumber(_message[18]),
                Exclusion: {
                    Timer: [Tools.TimeOut(35, 36, 37), Tools.TimeOut(38, 39, 40), Tools.TimeOut(41, 42, 43)],
                },
            },

        };
        console.log(Home.Exclusion.Timer)
        console.log(Guest.Exclusion.Timer)

    }
}

module.exports = Frame_0x35;