
/*
    * 0x74 : Clear all
 */

class Frame_0x74 {
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
module.exports = Frame_0x74;