const Frame_0x3A = require('../../RSCOM/Frame/Frame_0x3A');

describe('Frame_0x3A', () => {
    test('should build correct GSI object from message', () => {
        const message = [
            0xF8, // Start byte
            0x3A, // Sport type
            0x20, 0x20, // Reserved
            0x31, 0x33, 0x31, 0x20, // Chrono
            0x20, // Reserved
            0x30, 0x30, // Home Points
            0x20, // Reserved
            0x30, 0x31, // Guest Points
            0x30, // Set Number
            0x30, // Home Sets Won
            0x31, // Guest Sets Won
            0x20, 0x20, 0x20, // Reserved
            0x30, // Timer Status
            0x31, // Clock/Timer Display
            0x20, 0x20, // Reserved
            0x30, 0x30, // Home Points in Set 1
            0x30, 0x30, // Guest Points in Set 1
            0x30, 0x30, // Home Points in Set 2
            0x30, 0x30, // Guest Points in Set 2
            0x30, 0x30, // Home Points in Set 3
            0x30, 0x30, // Guest Points in Set 3
            0x30, 0x30, // Home Points in Set 4
            0x30, 0x30, // Guest Points in Set 4
            0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, // Reserved
            0x31, // Service
            0x30, // Winner
            0x20, // Reserved
            0x0D, // End byte
        ];
        const expectedGSI = {
            insertType: 'DirectConsoleData',
            Chrono: '13.1',
            Home_TotalPoints: 0,
            Guest_TotalPoints: 1,
            Home_SetsWon: 0,
            Guest_SetsWon: 1,
            Timer_Status: true,
            LED: false,
            Clock_Display: true,
            Chrono_Display: false,
            Home_PointsBySet: [0, 0, 0, 0],
            Guest_PointsBySet: [0, 0, 0, 0],
            Home_Service: 1,
            Guest_Service: 0,
            Home_Winner: false,
            Guest_Winner: false,
        };

        const result = Frame_0x3A.build(message);

        expect(result).toEqual(expectedGSI);
    });


});
