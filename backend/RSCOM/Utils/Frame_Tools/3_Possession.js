const eTeam = require("../../Utils/Enums/eTeam");

function Possession(_message) {
    Possession = {
        Guest: false,
        Home: false,
    }
    if (_message === 0x31) {
        Possession.Guest = false;
        Possession.Home = true;
    } else if (_message === 0x32) {
        Possession.Home = false;
        Possession.Guest = true;
    } else {
        Possession.Guest = false
        Possession.Home = false
    }

    return Possession;
}

module.exports = Possession;