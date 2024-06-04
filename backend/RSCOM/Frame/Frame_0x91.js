// TEAM NAME CLEARS

/*
    * 0x90 : Clear all
 */

module.exports = class Frame_0x90 {
    static build() {
        return {
            insertType: "DirectConsoleData",
            Home: {
                TeamName: "",
                PlayerName: Array(16).fill(""),
            },
            Guest: {
                TeamName: "",
                PlayerName: Array(16).fill(""),
            },
        };
    }
}
