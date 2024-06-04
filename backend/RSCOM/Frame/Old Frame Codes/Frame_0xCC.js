const nBytesToNumber = require('../../Utils/nBytesToNumber');

class Frame_0xCC {
    static build(_message) {
        return {
            Mode: nBytesToNumber(_message[2]),
        }
    }
}

module.exports = Frame_0xCC;