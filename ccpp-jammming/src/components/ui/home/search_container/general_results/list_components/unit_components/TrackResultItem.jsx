import React from "react";
import IMG from "../../../../../../../assets/images/ImagesHUB";

function TrackResultItem({ artistContent, albumContent, trackContent, onArtistClick, onAlbumClick, onPlayButton, accessToken }) {
    const uriTrack = trackContent.trackUri;

    let trackCover;
    if (trackContent.trackCover) {
        trackCover = trackContent.trackCover;
    } else {
        trackCover = IMG.placeHolders;
    }

    function millisToMinutesAndSeconds(millis) {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    return (
        <>
            <div id="songs-inner-row" className="row">
                <div id="col-add" className="col-1 d-flex justify-content-center align-items-center">
                    <a id="play-button" type="button" onClick={() => onPlayButton(uriTrack)}>
                        <img id="play-icon" src={IMG.play2PNG} alt="play icon" width="20px"/>
                    </a>
                </div>
                <div id="col-cover" className="col-1 d-flex justify-content-center align-items-center">
                    <img src={trackCover} height="40px"/>
                </div>
                <div id="col-title" className="col d-flex justify-content-start align-items-center">
                    <h5>{trackContent.trackTitle}</h5>
                    <p><a id="open-artist-page" type="button" onClick={() => onArtistClick(artistContent, onArtistClick, onAlbumClick, onPlayButton, accessToken)}>{trackContent.trackAuthor}</a></p>
                </div>
                <div id="col-plus" className="col-1 d-flex justify-content-end align-items-center">
                    <img id="plus-icon" src={IMG.plus2PNG} alt="plus icon" width="25px"/>
                </div>
                <div id="col-minus" className="col-1 d-flex justify-content-start align-items-center">
                    <img id="minus-icon" src={IMG.minus2PNG} alt="minus icon" width="25x"/>
                </div>
                <div id="col-album" className="col-3 d-flex justify-content-start align-items-center">
                    <p><a id="open-album-page" type="button" onClick={() => onAlbumClick(albumContent, onArtistClick, onAlbumClick, onPlayButton, accessToken)}>{trackContent.trackAlbum}</a></p>
                </div>
                <div id="col-duration" className="col-1 d-flex justify-content-center align-items-center">
                    <p>{millisToMinutesAndSeconds(trackContent.trackDuration)}</p>
                </div>
            </div> 
        </>
    );
}

export default TrackResultItem;