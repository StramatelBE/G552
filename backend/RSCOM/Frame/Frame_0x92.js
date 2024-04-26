// FULL CLEAR


const nBytesToNumber = require("../Utils/nBytesToNumber");
const Tools = require("../Utils/Frame_Tools/Frame_Tools_index");
const eSport = require("../Utils/Enums/eSport");


/*
    * 0x92 : Full Clear
 */

module.exports = class Frame_0x92 {
    static build(_message) {
        return {
            Mode: nBytesToNumber(_message[2]),
        }
    }
}
