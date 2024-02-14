const LED = require("../Enums/eLED");
function sDisplay(_message) {
    let Display = {
        Status: false,
        LED: false,
    }
    if (_message=== 0x30) {
        Display.Status = false;
        Display.LED = LED.eMode.Off;
    } else if (_message === 0x31) {
        Display.Status = true;
        Display.LED = LED.eMode.Fix;
    } else if (_message === 0x32) {
        Display.Status = true;
        Display.LED = LED.eMode.Blink;
    }

    return Display;
}

module.exports = sDisplay;