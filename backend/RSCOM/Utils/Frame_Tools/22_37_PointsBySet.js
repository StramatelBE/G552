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
function pointsBySet(startIndex, size, step, message) {
    let pointsBySet = new Array(size);


    for (let i = 0; i < message.length; i += 2) {
        pointsBySet[i] = nBytesToNumber(message[startIndex * i + step], message[startIndex + i * step + 1]);
    }



    return pointsBySet;
}

module.exports = pointsBySet;
