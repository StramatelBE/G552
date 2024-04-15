const nBytesToNumber = require("../nBytesToNumber");

function Exclusion(startIndex, size, _message) {
    let Timer = new Array(size); // Use 'let' for proper scoping

    for (let i = 0; i < size; i++) {
        // Directly use i * 3 to move to the next timer's first byte
        let offset = i * 3; // Adjusting as per the clarification that each timer is exactly 3 bytes
        Timer[i] = nBytesToNumber(_message[startIndex + offset], _message[startIndex + offset + 1], _message[startIndex + offset + 2]);

        // Assuming the condition to check for a default value remains the same
        if (_message[startIndex + offset] === 0x30 && _message[startIndex + offset + 1] === 0x30 && _message[startIndex + offset + 2] === 0x30) {
            Timer[i] = 1000; // Setting a default value if the timer is uninitialized
        }
    }


    return Timer;
}

module.exports = Exclusion;
