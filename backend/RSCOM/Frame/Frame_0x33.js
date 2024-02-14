const nBytesToNumber = require("../Utils/nBytesToNumber");
const Tools = require("../Utils/Frame_Tools/Frame_Tools_index");
const eSport = require("../Utils/Enums/eSport");


/*
    * 0x33 : Basketball
 */

// console.log("Start:",_message[0])
// console.log("Sport:",_message[1])
// console.log("[X]", _message[2])
// console.log("Possession", _message[3])
// console.log("Chrono:", _message[4], _message[5], _message[6], _message[7])
// console.log("Home Points", _message[8], _message[9], _message[10])
// console.log("Guest Points", _message[11], _message[12], _message[13])
// console.log("Period:", _message[14])
// console.log("Home Fouls:", _message[15])
// console.log("Guest Fouls:", _message[16])
// console.log("Home Timeout:", _message[17])
// console.log("Guest Timeout:", _message[18])
// console.log("Klaxon:", _message[19], _message[20])
// console.log("Timer:", _message[21])
// console.log("Timeout Chrono:", _message[21], _message[46], _message[47])






class Frame_0x33 {
    static build(_message) {
        return {
            Mode: nBytesToNumber(_message[2]),
            InsertType: "DirectConsoleData",
            Sport: eSport.Basketball,

            Timer: {
                Value: Tools.Chrono(_message[4], _message[5], _message[6], _message[7]),
                Display: Tools.ClockTimerDisplay(_message[8]).Timer,
                Status: Tools.TimerStartStop(_message[20]).Status,
                LED: Tools.TimerStartStop(_message[20]).LED,
                Horn: Tools.Horn(_message[19]),
            },


            Timer24s: {
                Status: Tools.sTimerStartStop(_message[24]).Status,
                LED: Tools.sTimerStartStop(_message[24]).LED,
                Value: Tools.Chrono24s(nBytesToNumber(_message[48]), nBytesToNumber(_message[49])),
                Horn24s_Status: Tools.sHorn(_message[50]),
            },

            Period: nBytesToNumber(_message[14]),

            Home: {
                Points: Tools.Score(_message[8], _message[9], _message[10]),
                Fouls: {
                    Team: Tools.B_TeamFouls(_message[15]).TeamFouls,
                    RS: Tools.B_TeamFouls(_message[15]).TeamFouls_RS,
                    Individual: Tools.IndividualFouls(22, 12, _message),
                },
                Possession: Tools.Possession(_message[3]).Home,
                Timeout: {
                    Count: nBytesToNumber(_message[17]),
                    Time: Tools.TimeOut(nBytesToNumber(_message[21]), nBytesToNumber(_message[46]), nBytesToNumber(_message[47])),
                }
            },

            Guest: {
                Points: Tools.Score(_message[11], _message[12], _message[13]),
                Fouls: {
                    Team: Tools.B_TeamFouls(_message[16]).TeamFouls,
                    RS: Tools.B_TeamFouls(_message[16]).TeamFouls_RS,
                    Individual: Tools.IndividualFouls(34, 12, _message),
                },
                Possession: Tools.Possession(_message[3]).Guest,
                Timeout: {
                    Count: nBytesToNumber(_message[18]),
                    Time: Tools.TimeOut(nBytesToNumber(_message[21]), nBytesToNumber(_message[46]), nBytesToNumber(_message[47])),
                }
            }
        };
    }
}

module.exports = Frame_0x33;