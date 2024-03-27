function Service(_message) {
    let Service = {
        Home: 0,
        Guest: 0,
    }

    if (_message === 0x31) {
        Service.Home = 1;
        Service.Guest = 0;
    } else if (_message === 0x32) {
        Service.Home = 2;
        Service.Guest = 0;
    } else if (_message === 0x33) {
        Service.Home = 0;
        Service.Guest = 1;
    } else if (_message === 0x34) {
        Service.Home = 0;
        Service.Guest = 2;
    } else {
        Service.Home = 0;
        Service.Guest = 0;
    }

    return Service;
}

module.exports = Service;