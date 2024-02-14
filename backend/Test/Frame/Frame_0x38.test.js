const Frame_0x38 = require('../../RSCOM/Frame/Frame_0x38');
const LED = require("../../RSCOM/Utils/Enums/eLED");

describe('Frame_0x38', () => {
    test('build should return a GSI object', () => {
        const message = [
            0xF8, // Start byte
            0x38, // Sport type
            0x20, 0x20, // Reserved
            0x30, 0x30, 0x30, 0x30, // Chrono
            0x20, 0x20, 0x20, // Reserved
            0x30, 0x30, // Player individual points 14
            0x30, 0x30, // Player individual points 15
            0x30, 0x30, // Player individual points 16
            0x20, 0x20, // Reserved
            0x30, // Horn
            0x30, // Timer Status
            0x30, // Clock/Timer Display
            0x30, 0x30, // Player individual points 1
            0x30, 0x30, // Player individual points 2
            0x30, 0x30, // Player individual points 3
            0x30, 0x30, // Player individual points 4
            0x30, 0x30, // Player individual points 5
            0x30, 0x30, // Player individual points 6
            0x30, 0x30, // Player individual points 7
            0x30, 0x30, // Player individual points 8
            0x30, 0x30, // Player individual points 9
            0x30, 0x30, // Player individual points 10
            0x30, 0x30, // Player individual points 11
            0x30, 0x30, // Player individual points 12
            0x30, 0x30, // Player individual points 13
            0x30, 0x30, // 24s Timer
            0x30, // 24s Horn
            0x30, // 24s StartStop
            0x30, // 24s Display
            0xD0, // End byte
        ];

        const expectedGSI = {
            InsertType: 'DirectControlData',
            Chrono: '00:00',
            Home_IndiviualPoints: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            Timer_Status: true,
            Timer_LED: false,
            Clock_Display: false,
            Timer24s_LED: false,
            Chrono_Display: true,
            Timer24s_Digit1: 0,
            Timer24s_Digit2: 0,
            Horn24s_Status: false,
            Timer24s_Status: true,
            Display_Status: false,
            Display_LED_Mode: LED.eMode.Off,
        };

        expect(Frame_0x38.build(message)).toEqual(expectedGSI);
    });
});
