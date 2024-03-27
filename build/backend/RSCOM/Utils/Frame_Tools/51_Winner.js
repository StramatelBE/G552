function Winner(_message) {
    let Winner = {
        Home: false,
        Guest: false,
    }
    if (_message === 0x31) {
        Winner.Home = true;
    } else if (_message === 0x32) {
        Winner.Guest = true;
    }
    return Winner;
}

module.exports = Winner;