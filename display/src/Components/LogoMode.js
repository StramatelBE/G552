import React from "react";
import "./Mode.css";

const LogoMode = () => {
    return (
        <div className="container">
            <video
                className="logo"
                src="http://localhost:3000/medias/Logo/stramatel.mp4"
                alt="logo"
                loop
                autoPlay
            />
        </div>
    );
}

export default LogoMode;