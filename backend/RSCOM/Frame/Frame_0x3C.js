const eSport = require("../Utils/Enums/eSport");
const Tools = require("../Utils/Frame_Tools/Frame_Tools_index");
const nBytesToNumber = require("../Utils/nBytesToNumber");

/*
    * 0x3C : Handball Avec Pénalités individuelles
 */

class Frame_0x3C {
    static build(_message) {
        return {
            Mode: nBytesToNumber(_message[2]),

            InsertType: "DirectConsoleData",
            Sport: eSport.Handball,

            Chrono: {
                Value: Tools.Chrono(_message[4], _message[5], _message[6], _message[7]),
            },

            Horn: Tools.Horn(_message[19]),

            Home: {
                IndividualFouls: Tools.IndividualFouls(22, 14, _message),
            },

            Guest: {
                IndividualFouls: Tools.IndividualFouls(36, 14, _message),
            }
        };
    }
}

module.exports = Frame_0x3C;
