const assert = require('chai').assert;
const Frame_0x3C = require('../../RSCOM/Frame/Frame_0x3C');

describe('Frame_0x3C', function () {
    describe('Build', function () {
        it('Chrono should return 12.2', function () {
            const message = [
                0xF8, // Start
                0x3C, // Sport Definition
                0x20, 0x20, // Reserved
                0x31, 0x32, 0x32, 0x20, // Chrono
                0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, // Reserved
                0x31, // Horn
                0x20, // Timer Start/Stop
                0x20, // Reserved
                0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37,
                0x38, 0x39, 0x30, 0x30, 0x30, 0x30, 0x30, // Home Individual Fouls
                0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37,
                0x38, 0x39, 0x30, 0x30, 0x30, 0x30, 0x30, // Guest Individual Fouls
                0x20, 0x20, 0x20, // Reserved
                0x0D // End
            ];
            const expectedResult = {
                InsertType: 'DirectConsoleData',
                Sport: 'HandBall',
                Chrono: '12.2',
                Horn: true,
                Home_IndividualFoul: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0, 0],
                Guest_IndividualFoul: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0, 0]
            };

            const result = Frame_0x3C.build(message);
            assert.deepEqual(result, expectedResult);
        });

        it('Chrono should return 24:59', function () {
            const message = [
                0xF8, // Start
                0x3C, // Sport Definition
                0x20, 0x20, // Reserved
                0x32, 0x34, 0x35, 0x39, // Chrono
                0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, // Reserved
                0x31, // Horn
                0x20, // Timer Start/Stop
                0x20, // Reserved
                0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30, 0x30, 0x30, 0x30, 0x30, // Home Individual Fouls
                0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30, 0x30, 0x30, 0x30, 0x30, // Guest Individual Fouls
                0x20, 0x20, 0x20, // Reserved
                0x0D // End
            ];
            const expectedResult = {
                InsertType: 'DirectConsoleData',
                Sport: 'HandBall',
                Chrono: '24:59',
                Horn: true,
                Home_IndividualFoul: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0, 0],
                Guest_IndividualFoul: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0, 0]
            };

            const result = Frame_0x3C.build(message);
            assert.deepEqual(result, expectedResult);
        });
    });
});
