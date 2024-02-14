const Frame_0x93 = require("../../RSCOM/Frame/Frame_0x93");
describe('Frame_0x93', () => {
    it('. Chrono', () => {
        const message = [
            0xF8, // Start byte
            0x35, // Sport type
            0x20, 0x20, // Reserved
            0x31, 0x32, 0x33, 0x20, // Chrono
            0x30, // Home Team fouls units
            0x30, 0x30, // Home Score
            0x30, // Guest Team fouls units
            0x30, 0x30, // Guest Score
            0x30, // Period number
            0x30, // Home Penalties in Progress
            0x30, // Guest Penalties in Progress
            0x30, // Home Timeouts
            0x30, // Guest Timeouts
            0x31, // Horn
            0x30, // Timer Start/Stop
            0x20, // Reserved
            0x30, 0x30, 0x30, // 1st Home Exclusion Timer
            0x30, 0x30, 0x30, // 2nd Home Exclusion Timer
            0x30, 0x30, 0x30, // 3rd Home Exclusion Timer
            0x20, 0x20, 0x20, 0x20, // Reserved
            0x30, 0x30, 0x30, // 1st Guest Exclusion Timer
            0x30, 0x30, 0x30, // 2nd Guest Exclusion Timer
            0x30, 0x30, 0x30, // 3rd Guest Exclusion Timer
            0x20, // Reserved
            0x0D, // End byte
        ];

        const expectedGSI = {
            insertType: 'DirectConsoleData',
            Chrono: '12.3',
            Home_Points: 0,
            Guest_Points: 0,
            Period: 0,
            Timer_Status: true,
            Home_TimeOuts: 0,
            Guest_TimeOuts: 0,
            Home_PenaltiesInProgress: [false, false, false],
            Guest_PenaltiesInProgress: [false, false, false],
            Home_PenaltiesTimer: [0, 0, 0],
            Guest_PenaltiesTimer: [0, 0, 0],
            Horn: true,
            Timer_LED: false,
        };

        const result = Frame_0x93.build(message);

        expect(result).toEqual(expectedGSI);
    });
});