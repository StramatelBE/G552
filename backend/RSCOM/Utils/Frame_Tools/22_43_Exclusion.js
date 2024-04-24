const nBytesToNumber = require("../nBytesToNumber");
const ShirtNumber = require("./4_35_ShirtNumber");

function Exclusion(startIndex, size, _message, type) {
    let result = new Array(size); 

    for (let i = 0; i < size; i++) {
        if (type === 'timer') {
            let offset = i * 5; // Ajustement pour sauter les 5 octets (3 pour le timer, 2 pour le numéro)
            result[i] = nBytesToNumber(_message[startIndex + offset], _message[startIndex + offset + 1], _message[startIndex + offset + 2]);
        } else if (type === 'shirtNumber') {
            let offset = i * 5 + 3; // Ajustement pour accéder aux deux octets du numéro de maillot après les 3 octets de timer
            result[i] = nBytesToNumber(_message[startIndex + offset], _message[startIndex + offset + 1]);
        }
    }

    return result;
}

module.exports = Exclusion;
