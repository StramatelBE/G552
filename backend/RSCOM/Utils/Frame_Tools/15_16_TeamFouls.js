const nBytesToNumber = require('../nBytesToNumber');

function TeamFouls(_message) {
    const Team = {
        TeamFouls: 0,
        TeamFouls_RS: false,
    }
    if (_message === 0x52) {
        Team.TeamFouls = 8;
        Team.TeamFouls_RS = true;
    } else {
        Team.TeamFouls = nBytesToNumber(_message);
        Team.TeamFouls_RS = false;
    }
    return Team;
}

module.exports = TeamFouls;