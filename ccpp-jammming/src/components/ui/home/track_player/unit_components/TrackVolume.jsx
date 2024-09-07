import React, { useState, useEffect, useRef } from "react";
import IMG from "../../../../../assets/images/ImagesHUB";

function TrackVolume() {
    const [mute, setMute] = useState(0);

    return (
        <>
           <div id="volume-bar-row" className="row d-flex">
                <div id="mute-icon" className="col d-flex justify-content-end align-items-center">
                    <img src={IMG.volumePNG} alt="mute volume" height="20px"/>
                </div>
                <div id="volume-bar" className="col-1 d-flex justify-content-center align-items-center">
                    <input 
                        id="progress-bar" 
                        type="range" 
                        min={0} 
                        max={100} 
                        value={liveTrackPosition} 
                        onChange={handleProgressBarChange} />
                </div>
            </div>
        </>
    );
}

export default TrackVolume;