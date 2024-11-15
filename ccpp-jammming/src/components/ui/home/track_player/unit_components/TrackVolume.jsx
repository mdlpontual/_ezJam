import React, { useState, useEffect, useRef } from "react";
import IMG from "../../../../../assets/images/ImagesHUB";

function TrackVolume({ volumeControl }) {
    const [volume, setVolume] = useState(50); // Default volume at 50%
    const debounceRef = useRef(null); // Ref to store the debounce timeout
    const prevVolumeRef = useRef(volume); // Ref to store the previous volume value before muting

    const handleMuteButton = () => {
        if (volume !== 0) {
            // Save the current volume before muting
            prevVolumeRef.current = volume;
            volumeControl(0); // Mute the volume
            setVolume(0); // Update the local state to reflect muted volume
        } else {
            // Restore the previous volume when unmuting
            volumeControl(prevVolumeRef.current / 100); // Spotify API expects a value between 0 and 1
            setVolume(prevVolumeRef.current); // Update the local state to the previous volume
        }
    };

    // Debounced volume change handler
    const handleVolumeChange = (e) => {
        const newVolume = Number(e.target.value) / 100; // Spotify API expects a value between 0 and 1
        setVolume(e.target.value); // Update local state

        // Debounce the API call to avoid multiple requests
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            volumeControl(newVolume); 
        }, 50);
    };

    let speakerPicture = volume > 0 ? IMG.volumePNG : IMG.mutePNG;

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key.toLowerCase() === "m") {
                handleMuteButton(); // Toggle mute/unmute on "M" key press
            }
        };
    
        // Attach the event listener
        window.addEventListener("keydown", handleKeyDown);
    
        // Clean up the event listener on unmount
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [volume]); // Add volume as a dependency to ensure updated volume state

    return (
        <>
            <div id="volume-bar-row" className="row d-flex">
                <a title="mute/unmute" id="mute-icon" type="button" className="col d-flex justify-content-end align-items-center" onClick={handleMuteButton}>
                    <img src={speakerPicture} alt="mute volume" height="20px"/>
                </a>
                <div id="volume-bar" className="col-1 d-flex justify-content-center align-items-center">
                    <input 
                        id="progress-bar" 
                        type="range" 
                        min={0} 
                        max={100} 
                        value={volume} 
                        onChange={handleVolumeChange} />
                </div>
            </div>
        </>
    );
}

export default TrackVolume;