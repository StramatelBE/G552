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

    console.log("Points In Set, Even points list")
    for (let i = 0; i < message.length; i+=2) {
        console.log(i, nBytesToNumber(message[i], message[i + 1]));
     
        
    }

    console.log("Points In Set, Odd points list")

    for (let i = 0; i < message.length; i+=2) {
       
        console.log(i + 1, nBytesToNumber(message[i + 1], message[i + 2]));
        
    }

    console.log("Points In Set, Message value list")

    for (let i = 0; i < message.length; i++) {
        console.log(i, message[i]);
   
        
    }
    pointsBySet[0] = nBytesToNumber(message[startIndex], message[startIndex + 1]);
    pointsBySet[1] = nBytesToNumber(message[startIndex  + 4], message[startIndex + 5]);
    pointsBySet[2] = nBytesToNumber(message[startIndex + 9], message[startIndex + 10]);
    pointsBySet[3] = nBytesToNumber(message[startIndex + 13], message[startIndex + 14]);

    return pointsBySet;
}

module.exports = pointsInSet;
