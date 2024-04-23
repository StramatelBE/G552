// TEAM NAME CLEARS

/*
    * 0x91 : Clear all
 */

module.exports = class Frame_0x91 {
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
