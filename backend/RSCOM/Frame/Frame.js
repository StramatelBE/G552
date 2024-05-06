module.exports = class Base_Frame {
    constructor(_message) {
        this._message = _message;
    }
    getFrame() {
        return {
            Frame: this._message[0],
            Size: this._message[1],
            Mode: this._message[2],
            Data: this._message.slice(3, this._message.length - 1),
            Checksum: this._message[this._message.length - 1],
        }
    }
}