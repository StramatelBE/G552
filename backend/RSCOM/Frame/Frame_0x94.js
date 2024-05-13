// QR MODE

const { StringDecoder } = require('string_decoder');
const Encode = require('../Utils/Encode');
const Tools = require('../Utils/Frame_Tools/Frame_Tools_index');
const nBytesToNumber = require('../Utils/nBytesToNumber');

/*
    * 0x94 : QR Mode
 */

module.exports =  class Frame_0x94 {
    static build(_message) {
        

        return {
            insertType: 'DirectConsoleData',
            Mode: nBytesToNumber(_message[2]), // TEST MODE
        };
    }
}