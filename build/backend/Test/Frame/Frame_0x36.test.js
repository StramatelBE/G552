const Frame_0x36 = require('../../RSCOM/Frame/Frame_0x36');

/*
    0x36 : Volleyball
 */

describe('Frame_0x36', () => {
    it('should parse a valid message into a GSI object', () => {
        const message = [
            0xF8, // Start byte
            0x36, // Sport code
            0x20, 0x20, // Reserved
            0x30, 0x30, 0x30, 0x20, // Chrono
            0x20, // Reserved
            0x30, 0x30, // Home points
            0x20, // Reserved
            0x30, 0x30, // Guest points
            0x31, // Set number
            0x30, // Set won by Home
            0x30, // Set won by Guest
            0x30, // Home Time out number
            0x30, // Guest Time out number
            0x30, // Horn
            0x30, // Timer Start/Stop
            0x30, // Clock/Timer display
            0x30, 0x30, // Home points in set 1
            0x30, 0x30, // Guest points in set 1
            0x30, 0x30, // Home points in set 2
            0x30, 0x30, // Guest points in set 2
            0x30, 0x30, // Home points in set 3
            0x30, 0x30, // Guest points in set 3
            0x30, 0x30, // Home points in set 4
            0x30, 0x30, // Guest points in set 4
            0x30, 0x30, 0x30, 0x30, 0x30, 0x30, // Home Player index
            0x30, 0x30, 0x30, 0x30, 0x30, 0x30, // Guest player index
            0x30, // Service
            0x30, // Winner
            0x20, // Reserved
            0xD0]; // End bytes
        const expectedGSI = {
            insertType: 'DirectConsoleData',
            Sport: 'VolleyBall',
            Chrono: '00.0',
            Home_TotalPoints: 0,
            Guest_TotalPoints: 0,
            Set: 1,
            Home_SetsWon: 0,
            Guest_SetsWon: 0,
            Home_CountTimeout: 0,
            Guest_CountTimeout: 0,
            Horn: false,
            Timer_Status: true,
            LED: false,
            Clock_Display: false,
            Chrono_Display: true,
            Home_PointsBySet: [0, 0, 0, 0],
            Guest_PointsBySet: [0, 0, 0, 0],
            Home_PlayersInPlay: [ true, true, true, true, true, true],
            Guest_PlayersInPlay: [ true, true, true, true, true, true],
            Home_Service: 0,
            Guest_Service: 0,
            Home_Winner: false,
            Guest_Winner: false
        };
        const actualGSI = Frame_0x36.build(message);
        expect(actualGSI).toEqual(expectedGSI);
    });
});
