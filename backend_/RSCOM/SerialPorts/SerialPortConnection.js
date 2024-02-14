const { SerialPort } = require('serialport');
const fs = require('fs').promises;
const path = require('path');
const config = require('../../config');

const EventEmitter = require('events');
const sharedEmitter = new EventEmitter();

let AllDevices = [];
let Closing = false;

class SerialPortConnection {
    constructor() {
        console.log('Serial Port Initialization');
        this.currentCOMPorts = [];
        this.connection = null;
        this.currentCOMPortName = "";
        this.checkInterval = null;

        // Bind 'this' to class methods
        this.StartReading = this.StartReading.bind(this);
        this.StopReading = this.StopReading.bind(this);
        this.TryConnectCOMPorts = this.TryConnectCOMPorts.bind(this);
        this.RefreshCurrentCOMPorts = this.RefreshCurrentCOMPorts.bind(this);
        this.ConnectAvailablePorts = this.ConnectAvailablePorts.bind(this);
    }

    async StartReading() {
        Closing = false;
        await this.RefreshCurrentCOMPorts();
        await this.ConnectAvailablePorts();

        // Check for ports every 0.1 seconds
        this.checkInterval = setInterval(this.TryConnectCOMPorts, config.SerialPort.RefreshInterval);
    }

    StopReading() {
        Closing = true;
        clearInterval(this.checkInterval);

        AllDevices.forEach(device => {
            if (device.Started) {
                // Check if device.SerialPort exists before attempting to drain and close it
                if (device.SerialPort) {
                    device.Continue = false;
                    device.SerialPort.drain(() => {
                        device.SerialPort.close(() => {
                            device.SerialPort = null;
                            console.log(`Closed port ${device.DevicePortName}`);
                        });
                    });
                } else {
                    console.log(`Could not close port ${device.DevicePortName.replace(/\t/g, "\\t")} because it is undefined.`);
                }
            }
        });
    }

    async TryConnectCOMPorts() {
        if (!Closing) {
            await this.RefreshCurrentCOMPorts();
            await this.ConnectAvailablePorts();
        }
    }

    async RefreshCurrentCOMPorts() {
        AllDevices.forEach(device => {
            device.DeviceExists = false;
        });

        let portnames = await SerialPort.list();
        let ports = await fs.readdir(config.SerialPort.Path);

        ports.forEach(port => {
            if (port.includes(config.SerialPort.Filter)) {
                let PortName = port;
                let found = false;
                AllDevices.forEach(device => {
                    if (device.DevicePortName === PortName) {
                        device.DeviceExists = true;
                        found = true;
                    }
                });

                if (!found) {
                    let device = {
                        DeviceExists: true,
                        Started: false,
                        DevicePortName: PortName,
                        LastReadTime: new Date()
                    };
                    AllDevices.push(device);
                    console.log("Added new COM Device : " + device.DevicePortName);
                }
            }
        });

        AllDevices = AllDevices.filter(device => device.DeviceExists);
    }

    async ConnectAvailablePorts() {
        for (const device of AllDevices) {
            if (!device.Started && device.DeviceExists) {
                // console.log("Connecting to : " + device.DevicePortName.replace(/\t/g, "\\t" + '\n'));
                device.Started = true;

                const options = {
                    baudRate: config.SerialPort.BaudRate,
                    dataBits: config.SerialPort.DataBits,
                    parity: config.SerialPort.Parity,
                    stopBits: config.SerialPort.StopBits,
                    readTimeout: config.SerialPort.ReadTimeout,
                    writeTimeout: config.SerialPort.WriteTimeout,
                    handshake: config.SerialPort.Handshake,
                    path: `${config.SerialPort.Path}/${device.DevicePortName}`
                };

                device.buffer = Buffer.alloc(0);

                device.SerialPort = new SerialPort(options, (err) => {
                    if (err) {
                        console.log(`Error opening port: ${err.message}`);
                        device.Started = false;
                    } else {
                        console.log(`${device.DevicePortName} open`);
                        device.SerialPort.on('data', data => {
                            try {
                                // Append new data to device buffer
                                device.buffer = Buffer.concat([device.buffer, data]);

                                // While there's enough data in the buffer to process
                                while (device.buffer.length >= 54) {
                                    // Check if buffer starts with 0xf8
                                    //TODO: Check if this is the correct way to check for 0xf8
                                    if (device.buffer[0] === 0xf8) {
                                        // Extract the 54-byte frame from the buffer
                                        const frame = device.buffer.slice(0, 54);

                                        // Emit an event with the complete data frame
                                        sharedEmitter.emit('data', frame);

                                        // Update the buffer to remove the used data
                                        device.buffer = device.buffer.slice(54);
                                    } else {
                                        // If buffer doesn't start with 0xf8, find the next occurrence of 0xf8
                                        let nextIndex = device.buffer.indexOf(0xf8);

                                        // If 0xf8 is found, trim the buffer up to that point
                                        // If not found, clear the buffer
                                        device.buffer = nextIndex !== -1 ? device.buffer.slice(nextIndex) : Buffer.alloc(0);
                                    }
                                }

                                device.LastReadTime = new Date();
                            } catch (err) {
                                console.log(`Error handling data from ${device.DevicePortName.replace(/\t/g, "\\t")}: ${err}`);
                            }
                        });

                        device.SerialPort.on('close', () => {
                            console.log(`${device.DevicePortName.replace(/\t/g, "\\t")} is closed`);
                            device.Started = false;
                        });
                        device.SerialPort.on('error', (err) => {
                            console.log(`Error with port ${device.DevicePortName}: ${err}`);
                            device.Started = false;
                        });
                    }
                });
            }
        }
    }
}

module.exports = { SerialPortConnection, sharedEmitter };
