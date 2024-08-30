import React from "react";
import IMG from "../../../../../assets/images/ImagesHUB";

function TrackDisplay() {
    return (
        <>
           <div id="col-cover" className="col-1 d-flex justify-content-center align-items-center">
                <img src={IMG.placeHolders} height="60px"/>
            </div>
            <div id="col-title" className="col-auto d-flex flex-column justify-content-center align-items-start">
                <h5>Aquatic Mouth Dance</h5>
                <p>Red Hot Chilli Peppers</p>
            </div>
            <div id="col-saved" className="col-auto d-flex justify-content-center align-items-center">
                <img id="saved-icon" src={IMG.savedPNG} height="20px" />
            </div>
            <div id="col-blank" className="col"></div>
        </>
    );
}

export default TrackDisplay;