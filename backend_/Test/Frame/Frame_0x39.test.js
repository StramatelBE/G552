const Frame_0x39 = require('../../RSCOM/Frame/Frame_0x39');

/*

 */

describe('Frame_0x39', () => {
    describe('build', () => {
        test('builds GSI object correctly', () => {
            const message = [
                0xF8, // Start byte
                0x39, // Sport type
                0x20, 0x20, // Reserved
                0x31, 0x32, 0x31, 0x20, // Chrono
                0x20, // Reserved
                0x30, 0x30, // Home points
                0x20, // Reserved
                0x30, 0x30, // Guest points
                0x31, // Set Number
                0x30, // Home Set Won
                0x30, // Guest Set Won
                0x20, 0x20, 0x20, // Reserved
                0x30, // Timer Start/Stop
                0x30, // Clock/Timer Display
                0x30, 0x30, // HOME Games won in the set
                0x30, 0x30, // Home Games in 1st Set
                0x30, 0x30, // Guest Games in 1st Set
                0x30, 0x30, // Home Games in 2nd Set
                0x30, 0x30, // Guest Games in 2nd Set
                0x20, 0x20, 0x20, // Reserved
                0x31, 0x30, // GUEST Games won in the set
                0x30, 0x30, // Home games in 3rd Set
                0x30, 0x30, // Guest games in 3rd Set
                0x30, 0x30, // Home games in 4th Set
                0x30, 0x30, // Guest games in 4th Set
                0x20, 0x20, 0x20, 0x20, 0x20, // Reserved
                0x30, // Service
                0x30, // Winner
                0x30, // Tie Break
                0x0D, // End bytes
            ];
            const gsi = Frame_0x39.build(message);
            expect(gsi).toEqual({
                insertType: 'DirectConsoleData',
                Chrono: '12.1',
                Home_Points: 0,
                Guest_Points: 0,
                Home_SetsWon: 0,
                Guest_SetsWon: 0,
                Timer_Status: true,
                Timer_LED: false,
                Clock_Display: false,
                Chrono_Display: true,
                Home_PointsInSet: [0, 0, 0, 0],
                Guest_PointsInSet: [0, 0, 0, 0],
                Home_Service: 0,
                Guest_Service: 0,
                Home_Winner: false,
                Guest_Winner: false,
                TieBreak: false,

            });
        });
    });
});
