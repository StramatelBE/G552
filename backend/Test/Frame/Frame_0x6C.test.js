const Frame_0x6C = require('../../RSCOM/Frame/Frame_0x6C');

test('Frame_0x6C.build returns a valid object', () => {
    const message = [
        0xF8, // Start byte
        0x6C, // Sport type
        0x20, 0x20, // Reserved
        0x30, 0x30, 0x30, 0x20, // Chrono
        0x20, // Reserved
        0x30, 0x31, // Home Points
        0x20, // Reserved
        0x30, 0x32, // Guest Points
        0x30, // Set Number
        0x33, // Home Sets Won
        0x30, // Guest Sets Won
        0x20, 0x20, 0x20, // Reserved
        0x31, // Timer Status
        0x30, // Clock/Timer Display
        0x20, 0x20, // Reserved
        0x30, 0x31, // Home Points in Set 1
        0x30, 0x30, // Guest Points in Set 1
        0x30, 0x32, // Home Points in Set 2
        0x30, 0x30, // Guest Points in Set 2
        0x30, 0x33, // Home Points in Set 3
        0x30, 0x30, // Guest Points in Set 3
        0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20,
        0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, // Reserved
        0x30, // Service
        0x30, // Winner
        0x20, // Reserved
        0x0D, // End byte
    ];

    const expected = {
        insertType: 'DirectConsoleData',
        Chrono: '00.0',
        Home_Points: 1,
        Guest_Points: 2,
        Home_SetsWon: 3,
        Guest_SetsWon: 0,
        Timer_Status: false,
        LED: false,
        Clock_Display: false,
        Chrono_Display: true,
        Home_PointsBySet: [1, 2, 3],
        Guest_PointsBySet: [0, 0, 0],
        Home_Service: 0,
        Guest_Service: 0,
        Home_Winner: false,
        Guest_Winner: false,
    };

    const result = Frame_0x6C.build(message);

    expect(result).toEqual(expected);
});
