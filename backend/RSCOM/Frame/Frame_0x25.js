// FUTSAL

const nBytesToNumber = require('../Utils/nBytesToNumber');
const Tools = require("../Utils/Frame_Tools/Frame_Tools_index");
const eSport = require("../Utils/Enums/eSport");

/*
    * 0x25 : FUTSAL
 */

module.exports = class Frame_0x25 {
    static build(_message) {
        return {
            Mode: nBytesToNumber(_message[2]),
            insertType: 'DirectConsoleData',
            Sport: eSport.Futsal,
            Display: eSport.Handball,

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
                    Team: Tools.TeamFouls(_message[8]),
                },
                PenaltiesInProgress: Tools.PenaltiesInProgress(_message[15]),
                Timeout : {
                    Counts: nBytesToNumber(_message[17]),
                },
                Exclusion: {
                    Timer: Tools.Exclusion_Handball(22, 2, _message, 'timer'),
                    ShirtNumber: ['', '', ''],
                }
            },

            Guest: {
                Points: nBytesToNumber(_message[12], _message[13]),
                Fouls: {
                    Team: nBytesToNumber(_message[11]),
                },
                PenaltiesInProgress: Tools.PenaltiesInProgress(_message[16]),
                Timeout: {
                   Counts: nBytesToNumber(_message[18]),
                },
                Exclusion: {
                    Timer: Tools.Exclusion_Handball(37, 2, _message, 'timer'),
                    ShirtNumber: ['', '', ''],
                }
            },

        };
    

    }
}

