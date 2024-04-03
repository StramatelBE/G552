const iconv = require('iconv-lite');

function TeamName(startIndex, _message) {
    // Creation of a buffer from the message
    const buffer = Buffer.from(_message);

    // Slice the buffer from the specified start index to the specified size
    // the size is 18/2 because we want to slice 18 bytes, but the buffer is in utf16, so 2 bytes per character
    const slicedBuffer = buffer.slice(startIndex, startIndex + 9 * 2);


    const decodedMessage = iconv.decode(slicedBuffer, 'utf16');


    console.log('Decoded Message:' + decodedMessage);

    return decodedMessage;
}

module.exports = TeamName;


