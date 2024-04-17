const Tools = require('../Utils/Frame_Tools/Frame_Tools_index');
const nBytesToNumber = require('../Utils/nBytesToNumber');
const eSport = require('../Utils/Enums/eSport');

/*
    * 0x94 : RINK HOCKEY
 */

class Frame_0x94 {
    static build(_message) {
        return {
            Mode: nBytesToNumber(_message[2]),
            insertType: 'RINK',
            Sport: eSport.Handball, //RINK HOCKEY

            Period: nBytesToNumber(_message[14]),

            Timer: {
                Value: Tools.Chrono(_message[4], _message[5], _message[6], _message[7]),
                Display: Tools.ClockTimerDisplay(_message[21]).Timer,
                Status: Tools.TimerStartStop(_message[20]).Status,
                LED: Tools.TimerStartStop(_message[20]).LED,
                Horn: Tools.Horn(_message[19]),
            },

            Home: {
                Points: nBytesToNumber(_message[9], _message[10]),
                Fouls:{
                    Team: Tools.TeamFouls(_message[2], _message[8]),
                },
                PenaltiesInProgress: Tools.PenaltiesInProgress(_message[15]),
                Timeout: {
                    Count: nBytesToNumber(_message[17]),
                },
                Exclusion: {
                    Timer: Tools.Exclusion(22, 3, _message),
                }
            },

            Guest: {
                Points: nBytesToNumber(_message[12], _message[13]),
                Fouls:{
                    Team: Tools.TeamFouls(_message[3], _message[11]),
                },
                PenaltiesInProgress: Tools.PenaltiesInProgress(_message[16]),
                Timeout: {
                    Count: nBytesToNumber(_message[18]),
                },
                Exclusion: {
                    Timer: Tools.Exclusion(35, 3, _message),
                }
            }
        }
    }
}

module.exports = Frame_0x94;