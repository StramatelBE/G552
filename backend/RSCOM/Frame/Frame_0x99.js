// CLOCK SETTINGS

const { StringDecoder } = require('string_decoder');
const Encode = require('../Utils/Encode');
const Tools = require('../Utils/Frame_Tools/Frame_Tools_index');
/*
    * 0x99 : Clock Settings
 */

module.exports =  class Frame_0x99 {
    static build(_message) {
    
        return {
            insertType: 'DirectConsoleData',
        };
    }
}