const nBytesToNumber = require('./nBytesToNumber');

function nBytesToTables(_startIndex, _step, _size,  _message) {
    let _nBytesToStepTables = [];
    for (let i = 0; i < _size; i++) {
        _nBytesToStepTables[i] = nBytesToNumber(_message[_startIndex + i * _step], _message[_startIndex + i * _step + 1]);
    }
    return _nBytesToStepTables;
}

module.exports = nBytesToTables;