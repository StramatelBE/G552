function ClockTimerDisplay(_message){
    let Display = {
        Clock: false,
        Timer: false,
    }

    if (_message === 0x31) {
        Display.Clock = true;
    } else {
        Display.Timer = true;
    }

    return Display;
}

module.exports = ClockTimerDisplay;