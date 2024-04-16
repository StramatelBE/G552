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
    let indexOffset = team === "L" ? 0 : 3; // Adjust index based on team (L or V)

    for (let i = 0; i < size; i++) {
        // Calculate the current index to read from, adjusting for the set number
        let currentIndex = startIndex + indexOffset + (i * 5);
        pointsBySet[i] = nBytesToNumber(message[currentIndex], message[currentIndex + 1]);
    }

    return pointsBySet;
}

module.exports = pointsInSet;
