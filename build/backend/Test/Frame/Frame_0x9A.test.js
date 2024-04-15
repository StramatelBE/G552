const Frame_0x9A = require('../../RSCOM/Frame/Frame_0x9A');

describe('Frame_0x9A', () => {
    it('should build a valid GSI object for 0x9A message with Chrono Status 0x30', () => {
        const message = [
            0xF8, // Start byte
            0x9A, // Sport type
            0x20, 0x20, // Reserved
            0x30, 0x30, 0x30, 0x20, // Chrono
            0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, // Reserved
            0x30, // Horn
            0x30, // Timer Status
            0x30, // Clock/Timer Display
            0x20, 0x20, 0x20, 0x20, 0x20, 0x20,
            0x20, 0x20, 0x20, 0x20, 0x20,
            0x20, 0x20, 0x20, 0x20, 0x20,
            0x20, 0x20, 0x20, 0x20, 0x20, // Reserved
            0xD0, // End byte

        ];
        const expectedGSI = {
            insertType: 'DirectConsoleData',
            Chrono: '00.0',
            Horn: false,
            Timer_Status: true,
            LED: false,
            Clock_Display: false,
            Chrono_Display: true,
        };
        const actualGSI = Frame_0x9A.build(message);
        expect(actualGSI).toEqual(expectedGSI);
    });

});