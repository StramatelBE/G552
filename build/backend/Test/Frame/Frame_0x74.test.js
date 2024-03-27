const assert = require("assert");
const Frame_0x74 = require('../../RSCOM/Frame/Frame_0x74');


describe("Frame_0x74", () => {
    it("should build an empty GameState_Insert object", () => {
        const message = Buffer.from([]);
        const result = Frame_0x74.build(message);

        assert.deepStrictEqual(result, {
            InsertType: "DirectConsoleData",
            Home_TeamName: "",
            Guest_TeamName: "",
            Home_PlayerName: Array(16).fill(""),
            Guest_PlayerName: Array(16).fill(""),
        });
    });
});