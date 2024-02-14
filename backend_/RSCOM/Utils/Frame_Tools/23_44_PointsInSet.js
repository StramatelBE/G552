const nBytesToNumber = require('../nBytesToNumber');

function PointsInSet(startIndex, step, size, _message){

    let pointsBySet = new Array(size);


    for (let i = 0; i < size; i++) {
        if (i == 2){
            startIndex += 5
        }

        pointsBySet[i] = nBytesToNumber(_message[startIndex], _message[startIndex + 1]);
        startIndex += step;

    }


    return pointsBySet;
}

module.exports = PointsInSet;