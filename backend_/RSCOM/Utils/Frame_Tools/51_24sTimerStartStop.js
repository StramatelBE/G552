function sTimerStartStop(_message) {
    let Timer = {
        Status: false,
        LED: false,
    }
    if (_message === 0x30) {
        Timer.Status = true;
        Timer.LED = false;
    } else if (_message === 0x31) {
        Timer.Status = false;
        Timer.LED = false;
    } else if (_message === 0x32 || _message === 0x33) {
        Timer.Status = false;
        Timer.LED = true;
    }
    return Timer;
}

module.exports = sTimerStartStop;