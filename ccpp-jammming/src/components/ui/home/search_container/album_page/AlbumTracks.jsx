import React from "react";
import IMG from "../../../../../assets/images/ImagesHUB";

function AlbumTracks({ trackContent, onArtistClick, onAlbumClick, accessToken }) {
    function millisToMinutesAndSeconds(millis) {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    return (
        <>
            <div id="songs-inner-row" className="row">
                <div id="col-num" className="col-1 d-flex justify-content-center align-items-center">
                    <h5 id="number-icon">{trackContent.trackNumber}</h5>
                    <img id="play-icon" src={IMG.play2PNG} alt="play icon" width="22px"/>
                </div>
                <div id="col-title" className="col d-flex justify-content-start align-items-center">
                    <h5>{trackContent.trackTitle}</h5>
                </div>
                <div id="col-plus" className="col-1 d-flex justify-content-end align-items-center">
                    <img id="plus-icon" src={IMG.plus2PNG} alt="plus icon" width="25px"/>
                </div>
                <div id="col-minus" className="col-1 d-flex justify-content-start align-items-center">
                    <img id="minus-icon" src={IMG.minus2PNG} alt="minus icon" width="25x"/>
                </div>
                <div id="col-duration" className="col-1 d-flex justify-content-center align-items-center">
                    <p>{millisToMinutesAndSeconds(trackContent.trackDuration)}</p>
                </div>
            </div> 
        </>
    );
}

export default AlbumTracks;