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
function pointsInSet(startIndex, size, team, message) {
    let pointsBySet = new Array(size);
    let indexOffset = team === "L" ? 0 : 2; // Adjust index based on team (L or V)


    for (let i = 0; i < message.length; i+=2) {
        console.log(i, nBytesToNumber(message[i], message[i + 1]));
    }

    pointsBySet[0] = nBytesToNumber(message[startIndex + indexOffset], message[startIndex + indexOffset + 1]);
    pointsBySet[1] = nBytesToNumber(message[startIndex + indexOffset + 4], message[startIndex + indexOffset + 5]);
    pointsBySet[2] = nBytesToNumber(message[startIndex + indexOffset + 13], message[startIndex + indexOffset + 14]);
    pointsBySet[3] = nBytesToNumber(message[startIndex + indexOffset + 16], message[startIndex + indexOffset + 17]);


    return pointsBySet;
}

module.exports = pointsInSet;
