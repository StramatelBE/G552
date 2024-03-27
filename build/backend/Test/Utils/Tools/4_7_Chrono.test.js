const Chrono = require('../../../RSCOM/Utils/Frame_Tools/4_7_Chrono');

describe('Chrono', () => {
    it('should return a valid Chrono value for 0x30 0x30 0x30 0x20', () => {
        const message = [0x30, 0x30, 0x30, 0x20];
        const expectedChrono = '00.0';
        const actualChrono = Chrono(0x30, 0x30, 0x30, 0x20);
        expect(actualChrono).toEqual(expectedChrono);
    });
})
