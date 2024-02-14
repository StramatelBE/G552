const Game = require('../../RSCOM/Game');
const Frames = require('../../RSCOM/Frame/Frame_index');
const sharedEmitter = require('../../Utils/SharedEmitter');

jest.mock('../../RSCOM/Game', () => {
    const { EventEmitter } = require('events');
    const actualGame = jest.requireActual('../../RSCOM/Game');

    actualGame.sharedEmitter = new EventEmitter();
    actualGame.Send = jest.fn();

    return actualGame;
});





describe('Game', () => {
    describe('isValid', () => {
        it('should return true if the first byte is 0xF8 and the 54th byte is 0x0D', () => {
            expect(Game.isValid(new Array(54).fill(0).map((v, i) => i === 0 ? 0xF8 : i === 53 ? 0x0D : v))).toBe(true);
        });
        it('should return false if the first byte is not 0xF8 or the 54th byte is not 0x0D', () => {
            expect(Game.isValid(new Array(54).fill(0))).toBe(false);
        });
    });

    describe('update', () => {
        // Mock the select method for this test
        beforeAll(() => {
            Game.select = jest.fn();
        });

        it('should call select if the message is valid', () => {
            Game.update(new Array(54).fill(0).map((v, i) => i === 0 ? 0xF8 : i === 53 ? 0x0D : v));
            expect(Game.select).toHaveBeenCalled();
        });

        it('should not call select if the message is not valid', () => {
            Game.select.mockClear();
            Game.update(new Array(54).fill(0));
            expect(Game.select).not.toHaveBeenCalled();
        });
    });

    describe('select', () => {
        it('should select the correct frame', () => {
            const _message = [0xF8, 0x3A];
            const mockFn = jest.fn();
            Frames._0x3A.build = mockFn;
            Game.select(_message);
            expect(mockFn).toHaveBeenCalled();
        });
    });


    describe('getState', () => {
        it('should return the current state', () => {
            const state = Game.getState();
            expect(state).toEqual(Game.State);
        });
    });

    describe('Insert', () => {
        it('should update the current state', () => {
            const newState = { insertType: 'NewState' };
            Game.Insert(newState);
            expect(Game.State).toEqual(newState);
        });
    });

    describe('Send', () => {
        let spy;

        beforeEach(() => {
            spy = jest.mock('../../Utils/SharedEmitter', () => ({
                emit: jest.fn(),
            }));
        });

        afterEach(() => {
            spy.mockRestore();
        });

        it('should emit the current state', () => {
            Game.Send();
            expect(spy).toHaveBeenCalledWith('scoring', Game.State);
        });
    });

});
