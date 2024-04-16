import React, {useState, useEffect} from 'react';
import './Mode.css';
import ScoringMode from './ScoringMode';

const PrematchMode = ({mediaState, mediaMode, gameState, setSwitchToScore}) => {
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

    useEffect(() => {
        console.log("ENTERING PREMATCH MODES");

        if (!Array.isArray(mediaState) || mediaState.length === 0) {
            console.log("No media available");
            return;
        }

        // Sort media by order
        mediaState.sort((a, b) => a.order - b.order);

        // console.log("MediaMode mediaState", mediaState);

        const currentMedia = mediaState[currentMediaIndex];
        const duration = (currentMedia && typeof currentMedia.duration === 'number') ? currentMedia.duration * 1000 : 5000; // Default to 5 seconds if not provided

        const timer = setTimeout(() => {
            setCurrentMediaIndex((currentMediaIndex + 1) % mediaState.length);
        }, duration);

        return () => clearTimeout(timer);
    }, [currentMediaIndex, mediaState]);

    if (!Array.isArray(mediaState) || mediaState.length === 0 || !mediaState[currentMediaIndex]) {
        return <div style={{backgroundColor: "black", width: "100%", height: "100%"}}></div>;
    }

    const currentMedia = mediaState[currentMediaIndex];
    const isVideo = currentMedia.type === "video" || currentMedia.type === "video/mp4"
    const mediaPath = currentMedia.path || ''; 
    const shouldLoop = mediaState.length === 1 && isVideo;

    return (
        <>  {mediaPath === "panel" ?
            
        :
            isVideo ? (
         
                    <video
                        src={"http://localhost:3000" + mediaPath}
                        style={{width: "512px", height: "256px"}}
                        autoPlay
                        preload={"auto"}
                        onEnded={() => setCurrentMediaIndex((currentMediaIndex + 1) % mediaState.length)}
                        loop={shouldLoop}
                    />
            ) : (
                <>
                    {
                        <img src={"http://localhost:3000" + mediaPath}
                             style={{width: "512px", height: "256px"}}
                             alt="Media content"/>
                       
                    }
                </>
            )}
        </>
    );
};

export default PrematchMode;
