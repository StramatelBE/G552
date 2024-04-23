// TEST MODE

const { StringDecoder } = require('string_decoder');
const Encode = require('../Utils/Encode');
const Tools = require('../Utils/Frame_Tools/Frame_Tools_index');
/*
    * 0x93 : Test Mode
 */

module.exports =  class Frame_0x93 {
    static build(_message) {
        

        return {
            insertType: 'DirectConsoleData',
            Mode: 99, // TEST MODE
        };
    }
}