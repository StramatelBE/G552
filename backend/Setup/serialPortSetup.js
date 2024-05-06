const { SerialPortConnection } = require("../RSCOM/SerialPorts/SerialPortConnection");

const setupSerialPort = () => {
    const sp = new SerialPortConnection();
    sp.StartReading();
    return sp;
};

module.exports = setupSerialPort;
