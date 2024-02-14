const Frame_0xA9 = require('../../RSCOM/Frame/Frame_0xA9');


describe('Frame_0xA9', () => {
    test('build returns correct object', () => {
        // Create a sample 54-byte message
        const message = new Uint8Array([
            0xF8, // Start byte
            0xA9, // Frame type
            0x20, 0x20, // Reserved
            0x30, 0x31, // Player 1
            0x30, 0x32, // Player 2
            0x30, 0x33, // Player 3
            0x30, 0x34, // Player 4
            0x30, 0x35, // Player 5
            0x30, 0x36, // Player 6
            0x30, 0x37, // Player 7
            0x30, 0x38, // Player 8
            0x30, 0x39, // Player 9
            0x31, 0x30, // Player 10
            0x31, 0x31, // Player 11
            0x31, 0x32, // Player 12
            0x31, 0x33, // Player 13
            0x31, 0x34, // Player 14
            0x31, 0x35, // Player 15
            0x31, 0x36, // Player 16
            0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20,
            0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, // Reserved
            0xd0 // End byte
        ]);

        // Build the expected object
        const expectedGSI = {
            insertType: 'DirectConsoleData',
            Home_PlayerNumber: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
        };

        // Call the build function and compare the result with the expected object
        expect(Frame_0xA9.build(message)).toEqual(expectedGSI);
    });
});
