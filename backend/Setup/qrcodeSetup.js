const QRCode = require("qrcode");

const setupQRCode = (app) => {
   
    app.get("/qrcode", async (req, res) => {
    try {
        const ssid = process.env.SSID;
        const password = process.env.PASSWORD;
        const authType = process.env.AUTH_TYPE;

        const qrCode = `WIFI:T:${authType};S:${ssid};P:${password};;`;
        const qrImage = await QRCode.toDataURL(qrCode);

        res.send(`<img src="${qrImage}" alt="QR Code" />`);
    }
    catch (error) {
        console.error("Error while generating QR Code:", error.message);
        res.status(500).send("Error while generating QR Code");
    }
});
};

module.exports = setupQRCode;