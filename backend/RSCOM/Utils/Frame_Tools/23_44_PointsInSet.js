const nBytesToNumber = require('../nBytesToNumber');

/**
 * Extract points for either Local (L) or Visitor (V) from the message.
 * 
 * @param {number} startIndex - The index in the message where to start reading the points.
 * @param {number} size - Number of sets to calculate points for.
 * @param {string} team - Specifies the team, either "L" for Local or "V" for Visitor.
 * @param {Array} message - The byte array containing the points data.
 * @returns {Array} An array containing the points for each set.
 */
function pointsInSet(startIndex, size, message) {
    let pointsBySet = new Array(size);


    for (let i = 0; i < message.length; i+=2) {
        console.log(i, nBytesToNumber(message[i], message[i + 1]));
    }

    pointsBySet[0] = nBytesToNumber(message[startIndex], message[startIndex + 1]);
    pointsBySet[1] = nBytesToNumber(message[startIndex  + 4], message[startIndex + 5]);
    pointsBySet[2] = nBytesToNumber(message[startIndex + 15], message[startIndex + 16]);
    pointsBySet[3] = nBytesToNumber(message[startIndex + 18], message[startIndex + 19]);

    return pointsBySet;
}

module.exports = pointsInSet;
