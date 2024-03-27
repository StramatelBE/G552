const path = require('path');

const config = {
    ip: 'localhost',
    portAPI: 4000,
    portWS: 8080,
    secret: "12846AE79A162BA5AE1DB56743A36",

    SerialPort: {
        MaxRetries: 10,
        RefreshInterval: 100,
        BaudRate: 38400,
        DataBits: 8,
        Parity: 'none',
        StopBits: 1,
        Handshake:'none',
        Path:`/dev`,
        Filter: `ttyS0`,
        ReadTimeout: 2000,
        WriteTimeout: 2000,
    }

    // WebSockets config
}

module.exports = config;