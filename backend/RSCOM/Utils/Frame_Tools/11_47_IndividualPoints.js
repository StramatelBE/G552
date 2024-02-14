const nBytesToNumber = require("../nBytesToNumber");

function IndividualPoints(_message){
    let IndividualPoints = new Array(16);
    IndividualPoints[13] = nBytesToNumber(_message[11], _message[12]);
    IndividualPoints[14] = nBytesToNumber(_message[13], _message[14]);
    IndividualPoints[15] = nBytesToNumber(_message[15], _message[16]);


    for (let i = 0; i < 13; i++) {
        IndividualPoints[i] = nBytesToNumber(_message[22 + i], _message[23 + i]);
    }

    return IndividualPoints;
}

module.exports = IndividualPoints;