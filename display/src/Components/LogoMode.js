import React from "react";
import "./Mode.css";

const LogoMode = () => {
    return (
        <div className="container">
            <video
                src="http://localhost:3000/medias/Logo/stramatel.mp4"
                autoPlay
                loop
                muted
                style={{ width: '100%', height: 'auto' }}  // Adjust sizing as needed
            />
        </div>
    );
    
}

export default LogoMode;
