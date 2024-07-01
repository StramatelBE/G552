import React from "react";
import "./Mode.css";

const QRMode = () => {
    return (
        <div className="container">
            <div className="qr-container">
                <div className="qr-item">
                    <h2>Wifi</h2>
                    <img
                        src="http://localhost:3000/medias/QR/wifi.png"
                        alt="QR Code for Wifi"
                    />
                </div>
                <div className="qr-item">
                    <h2>Application</h2>
                    <img
                        src="http://localhost:3000/medias/QR/website.png"
                        alt="QR Code for Website"
                    />
                </div>
            </div>
            <div className="logo-section">
                <img
                    src="http://localhost:3000/medias/Logo/LOGO_Stramatel.gif"
                    alt="Logo"
                />
            </div>
        </div>
    );
}

export default QRMode;