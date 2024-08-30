import React from "react";
import IMG from "../../../../../assets/images/ImagesHUB";

function TrackVolume() {
    return (
        <>
           <div id="volume-bar-row" className="row d-flex">
                <div id="mute-icon" className="col d-flex justify-content-end align-items-center">
                    <img src={IMG.volumePNG} alt="mute volume" height="20px"/>
                </div>
                <div id="volume-bar" className="col-1 d-flex justify-content-center align-items-center">
                    <input id="volume-bar" type="range" />
                </div>
            </div>
        </>
    );
}

export default TrackVolume;