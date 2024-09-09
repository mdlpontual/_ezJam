import React, { useState, useEffect, useRef } from "react";
import IMG from "../../../../../assets/images/ImagesHUB";

function TrackVolume({ volumeControl }) {
    const [volume, setVolume] = useState(50); // Default volume at 50%
    const debounceRef = useRef(null); // Ref to store the debounce timeout

    // Debounced progress bar change handler
    const handleVolumeChange = (e) => {
        const newVolume = Number(e.target.value) / 100; // Spotify SDK expects a value between 0 and 1
        setVolume(e.target.value); // Update local state

        // Clear any existing timeout to prevent multiple API calls
        clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            volumeControl(newVolume); 
        }, 300); 
    };

    
    let speakerPicture;
    if (volume > 0) {
        speakerPicture = IMG.volumePNG;
    } else {
        speakerPicture = IMG.mutePNG;
    }

    return (
        <>
           <div id="volume-bar-row" className="row d-flex">
                <div id="mute-icon" className="col d-flex justify-content-end align-items-center">
                    <img src={speakerPicture} alt="mute volume" height="20px"/>
                </div>
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