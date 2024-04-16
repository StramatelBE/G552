import React, { useState, useEffect } from 'react';
import './Mode.css';
import ScoringMode from './ScoringMode';

const PrematchMode = ({ mediaState, gameState }) => {
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const [showScoring, setShowScoring] = useState(false);

    useEffect(() => {
        if (!Array.isArray(mediaState) || mediaState.length === 0) {
            console.log("No media available");
            return;
        }

        // Sort media by order
        mediaState.sort((a, b) => a.order - b.order);

        const currentMedia = mediaState[currentMediaIndex];
        const duration = (currentMedia && typeof currentMedia.duration === 'number') ? currentMedia.duration * 1000 : 5000; // Default to 5 seconds if not provided

        const timer = setTimeout(() => {
            setShowScoring(true); // Show scoring after media ends

            // Set another timeout to hide ScoringMode after 10 seconds
            setTimeout(() => {
                setShowScoring(false);
                setCurrentMediaIndex((currentMediaIndex + 1) % mediaState.length); // Move to next media
            }, 10000);
        }, duration);

        return () => clearTimeout(timer);
    }, [currentMediaIndex, mediaState]);

    if (!Array.isArray(mediaState) || mediaState.length === 0 || !mediaState[currentMediaIndex]) {
        return <div style={{ backgroundColor: "black", width: "100%", height: "100%" }}></div>;
    }

    const currentMedia = mediaState[currentMediaIndex];
    const isVideo = currentMedia.type === "video" || currentMedia.type === "video/mp4"
    const mediaPath = currentMedia.path || '';
    const shouldLoop = mediaState.length === 1 && isVideo;

    return (
        <>
            {showScoring ? (
                <ScoringMode gameState={gameState} />
            ) : (
                <>
                    {mediaPath === null ?
                        <ScoringMode gameState={gameState} />
                        :
                        isVideo ? (
                            <video
                                src={"http://localhost:3000" + mediaPath}
                                style={{ width: "512px", height: "256px" }}
                                autoPlay
                                preload={"auto"}
                                onEnded={() => setShowScoring(true)}
                                loop={shouldLoop}
                            />
                        ) : (
                            <img src={"http://localhost:3000" + mediaPath}
                                 style={{ width: "512px", height: "256px" }}
                                 alt="Media content" />
                        )
                    }
                </>
            )}
        </>
    );
};

export default PrematchMode;
