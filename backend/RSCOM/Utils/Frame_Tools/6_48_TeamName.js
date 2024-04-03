const iconv = require('iconv-lite');

function TeamName(startIndex, _message) {
    // Creation of a buffer from the message
    const buffer = Buffer.from(_message);

    // Slice the buffer from the specified start index to the specified size
    // the size is 18/2 because we want to slice 18 bytes, but the buffer is in utf16, so 2 bytes per character
    const slicedBuffer = buffer.slice(startIndex, startIndex + 9 * 2);

     // Replace all occurrences of 20 20 with 00 20 in the sliced buffer
     // TODO: correct it in the code
     for (let i = 0; i < slicedBuffer.length - 2; i += 2) {
        if (slicedBuffer[i] === 0x20 && slicedBuffer[i + 2] === 0x20) {
            slicedBuffer[i] = 0x00; // Change the first 20 to 00
            // No need to change the second 20 as it's already 20
            i += 2; // Move past the modified sequence to avoid overlapping changes
        }
    }


    const decodedMessage = iconv.decode(slicedBuffer, 'utf16');


    console.log('Decoded Message:' + decodedMessage);

    return decodedMessage;
}

module.exports = TeamName;


