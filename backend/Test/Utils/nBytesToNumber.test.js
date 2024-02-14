const nBytesToNumber = require('../../RSCOM/Utils/nBytesToNumber');

describe('nBytesToNumber', () => {
    test('converts a single byte to its numeric value', () => {
        expect(nBytesToNumber(0x31)).toBe(1);
    });

    test('converts multiple bytes to their numeric value', () => {
        expect(nBytesToNumber(0x31, 0x32, 0x33)).toBe(123);
    });

    test('returns 0 for an empty input', () => {
        expect(nBytesToNumber()).toBe(0);
    });

    test('handles leading zeros correctly', () => {
        expect(nBytesToNumber(0x30, 0x30, 0x30, 0x31, 0x32, 0x33)).toBe(123);
    });
    test('chrono like' , () => {
        expect(nBytesToNumber(0x30).toString() + "." + nBytesToNumber(0x30).toString() + nBytesToNumber(0x30).toString()).toBe('0.00');
    });
    // test('handles non-numeric characters as 0', () => {
    //     expect(nBytesToNumber(0x31, 0x32, 0x2E, 0x33, 0x34)).toBe(1234);
    // });

});
