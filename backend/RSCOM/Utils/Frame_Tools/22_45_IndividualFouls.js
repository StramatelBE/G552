const nBytesToNumber = require('../nBytesToNumber');
function IndividualFouls(_startIndex, _teamSize, _message){
    let Team = new Array(_teamSize);

    for (let i = 0; i < _teamSize; i++) {
        Team[i] = nBytesToNumber(_message[_startIndex + i]);
    }
    return Team;
}

module.exports = IndividualFouls;