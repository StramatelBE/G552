import React from "react";
import "./Mode.css";

const LogoMode = () => {
    return (
        <div className="container">
            <iframe 
                className="logo-iframe" 
                src="http://localhost:4000/qrcode" 
                title="QR Code"
            />
            <img
             src="http://localhost:3000/medias/QR/wifi.png"
             alt="Logo"
            />
            <img
             src="http://localhost:3000/medias/QR/website.png"
             alt="Logo"
            />
            <img
                src="http://localhost:3000/medias/Logo/LOGO_Stramatel.gif"
                alt="Logo"
            />
        </div>
    );
}

export default LogoMode;