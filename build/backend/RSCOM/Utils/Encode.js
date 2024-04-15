function Encode(_message) {
    for (let i = 0; i < _message.length; i++) {
        if (_message[i] === 0x20) {
            _message[i] = 0x00;
        }
    }
    return _message;
}

module.exports = Encode;