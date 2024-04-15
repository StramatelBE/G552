const assert = require('chai').assert;
const Frame_0x33 = require('../../RSCOM/Frame/Frame_0x33');
const Frame_0x36 = require("../../RSCOM/Frame/Frame_0x36");

describe('Frame_0x33.build', () => {
    it('30', () => {
        const _message = [
            0xF8, // Start byte
            0x33, // Sport type
            0x20, // Reserved
            0x30, // Possession
            0x31, 0x32, 0x32, 0x20, // Chrono
            0x30, 0x31, 0x31, // Home Score
            0x30, 0x31, 0x31, // Guest Score
            0x30, // Period number
            0x31, // Home Team Fouls
            0x30, // Guest Team Fouls
            0x30, // Home Team Timeout
            0x30, // Guest Team Timeout
            0x30, // Horn
            0x30, // Timer Start/Stop
            0x31, // Time-out timer (digit 1)
            0x30, 0x30, 0x30, 0x30,
            0x30, 0x30, 0x30, 0x30,
            0x30, 0x30, 0x30, 0x30, // Home Individual Fouls
            0x30, 0x30, 0x30, 0x30,
            0x30, 0x30, 0x30, 0x30,
            0x30, 0x30, 0x30, 0x30, // Guest Individual Fouls
            0x30, // Time-out timer (digit 2)
            0x30, // Time-out timer (digit 3)
            0x32, // 24s timer (digit 1)
            0x34, // 24s timer (digit 2)
            0x30, // 24s horn
            0x30, // 24s Start/Stop
            0x30, // 24s Display
            0xD0, // End byte
        ];

        const expected = {

            InsertType: 'DirectConsoleData',
            Sport: 'BasketBall',
            Possession: 'None',
            Chrono: '12.2',
            Home_Points: 11,
            Guest_Points: 11,
            Period: 0,
            Home_TeamFouls: 1,
            Home_TeamFouls_RS: false,
            Guest_TeamFouls: 0,
            Guest_TeamFouls_RS: false,
            Home_CountTimeout: 0,
            Guest_CountTimeout: 0,
            Horn: false,
            Home_IndividualFoul: [
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
            ],
            Guest_IndividualFoul: [
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
            ],
            Chrono_TimeOut_Digit1: 1,
            Chrono_TimeOut_Digit2: 0,
            Chrono_TimeOut_Digit3: 0,
            Timer_Status: true,
            Timer_LED: false,
            Timer24s_Digit1: 2,
            Timer24s_Digit2: 4,
            Timer24s_LED: false,
            Horn24s_Status: false,
            Timer24s_Status: true,

            Display_Status: false,
            Display_LED_Mode: 'Off',
        }

        let result = Frame_0x33.build(_message);
        expect(result).toEqual(expected);


    });
});