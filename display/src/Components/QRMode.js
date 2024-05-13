import React from "react";
import "./Mode.css";

const LogoMode = () => {
    return (
        <div className="container">
             <iframe src="http://localhost:4000/qrcode" title="QR Code" />
             <img
                src="http://localhost:3000/medias/Logo/LOGO_Stramatel.gif"

            />
        </div>
    );
}

export default LogoMode;
